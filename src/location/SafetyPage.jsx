import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Share2, Shield, HeartPulse, Users, Search, Navigation } from 'lucide-react';
import SafetyReviews from './SafetyReviews';
import './SafetyPage.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Default Icon Fix
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Routing Component
const Routing = ({ userPosition, destination }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if (!userPosition || !destination) return;

        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(destination.lat, destination.lng)
            ],
            routeWhileDragging: true,
            showAlternatives: false,
            fitSelectedRoutes: true,
            lineOptions: {
                styles: [{ color: '#6FA1EC', weight: 4 }]
            },
            createMarker: () => null // Hide default markers to avoid clutter
        }).addTo(map);

        return () => {
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        };
    }, [userPosition, destination, map]);

    return null;
};

// Map Updater
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

const defaultCenter = [28.6139, 77.2090];

const SafetyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [destination, setDestination] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sosActive, setSosActive] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Monitoring Location");
    const [zoom, setZoom] = useState(15);

    // Backend Integration State
    const [user, setUser] = useState(null); // Full user object from DB
    const [showSettings, setShowSettings] = useState(false);

    const API_URL = 'http://localhost:5000/api/users';

    // Check for navigation state to open settings
    useEffect(() => {
        if (location.state?.openSettings) {
            setShowSettings(true);
        }
    }, [location.state]);

    // Track Location
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const pos = [position.coords.latitude, position.coords.longitude];
                    setCurrentPosition(pos);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setStatusMessage("Location Access Denied");
                },
                { enableHighAccuracy: true }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setStatusMessage("Geolocation not supported");
        }
    }, []);

    // Fetch User on Load
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            fetchUser(email);
        }
    }, []); // No dependency on navigate since we don't redirect

    const fetchUser = async (email) => {
        try {
            const res = await fetch(`${API_URL}/${email}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setStatusMessage(`Welcome, ${data.name}`);
            } else {
                localStorage.removeItem('userEmail');
                // Don't redirect, just stay as guest
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setStatusMessage("Backend Disconnected");
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const place = data[0];
                const dest = { lat: parseFloat(place.lat), lng: parseFloat(place.lon), name: place.display_name };
                setDestination(dest);
                setStatusMessage(`Routing to: ${place.display_name.split(',')[0]}`);
            } else {
                alert("Place not found");
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("Error searching for place");
        }
    };

    // Mock Nearby Places logic with Co-ordinates (Approximate for demo)
    // To make routing work for these, I am adding offsets to current position or hardcoding near points
    const nearbyPlaces = [
        { id: 1, name: "City Police Station", type: "Police Station", distance: "0.5 km", icon: Shield, styleClass: "icon-police", latOffset: 0.005, lngOffset: 0.002 },
        { id: 2, name: "General Hospital", type: "Hospital", distance: "1.2 km", icon: HeartPulse, styleClass: "icon-hospital", latOffset: -0.008, lngOffset: 0.005 },
        { id: 3, name: "City Mall (Crowded)", type: "Public Place", distance: "0.8 km", icon: Users, styleClass: "icon-crowd", latOffset: 0.003, lngOffset: -0.006 }
    ];

    const handlePlaceClick = (place) => {
        // Calculate a 'real' mock position based on current user position for demo
        // In real app, these would have fixed lat/lng
        const destLat = currentPosition[0] + place.latOffset;
        const destLng = currentPosition[1] + place.lngOffset;

        setDestination({ lat: destLat, lng: destLng, name: place.name });
        setStatusMessage(`Routing to ${place.name}`);
    };

    const saveSosContact = async (name, phone) => {
        if (!user) return;
        try {
            const res = await fetch(`${API_URL}/${user.email}/contacts`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, priority: true })
            });
            const updatedUser = await res.json();
            setUser(updatedUser);
            setShowSettings(false);
            alert("Contact Added!");
        } catch (err) {
            alert("Failed to save contact");
        }
    };

    const handleSOS = () => {
        if (!user || !user.sosContacts || user.sosContacts.length === 0) {
            alert("⚠️ Please add an SOS Contact first!");
            setShowSettings(true);
            return;
        }

        setSosActive(true);
        setStatusMessage("INITIATING SOS...");

        const lat = currentPosition[0];
        const lng = currentPosition[1];
        const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
        const message = `🚨 HELP! I am in danger. My location: ${mapLink}`;

        // Use primary contact (last added or first)
        const contact = user.sosContacts[user.sosContacts.length - 1]; // Get latest

        // Construct URLs
        const encodedMessage = encodeURIComponent(message);
        const whatsappAppUrl = `whatsapp://send?phone=${contact.phone}&text=${encodedMessage}`;
        const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${contact.phone}&text=${encodedMessage}`;

        // Try to open app directly
        window.location.href = whatsappAppUrl;

        // Fallback for desktop if app not installed (opens in new tab after short delay)
        // This is a common pattern to handle deep link failures
        setTimeout(() => {
            window.open(whatsappWebUrl, '_blank');
        }, 1500);

        setStatusMessage(`SOS SENT TO ${contact.name}!`);
        setTimeout(() => {
            setSosActive(false);
            setStatusMessage("Monitoring Location");
        }, 5000);
    };

    return (
        <div className="safety-page-container">
            <div className="map-container">
                <MapContainer
                    center={currentPosition}
                    zoom={zoom}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={currentPosition} icon={userIcon}>
                        <Popup>You are here</Popup>
                    </Marker>

                    {destination && (
                        <Marker position={[destination.lat, destination.lng]}>
                            <Popup>{destination.name}</Popup>
                        </Marker>
                    )}

                    <Routing userPosition={currentPosition} destination={destination} />
                    <MapUpdater center={currentPosition} />

                </MapContainer>

                {/* Search Bar Overlay */}
                <div className="search-overlay">
                    <input
                        type="text"
                        placeholder="Search destination..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}><Search size={20} /></button>
                </div>

                {/* User/Settings Button */}
                <button
                    style={{ position: 'absolute', top: '25px', right: '20px', zIndex: 1000, background: 'white', border: 'none', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                    onClick={() => setShowSettings(!showSettings)}
                    title="Manage Contacts"
                >
                    <Users size={20} color="#334155" />
                </button>

                {/* Login Modal Removed - Handled by /login page */}

                {/* Manage Contacts Modal */}
                {showSettings && user && (
                    <div style={{
                        position: 'absolute', top: '80px', right: '20px', width: '280px',
                        background: 'white', padding: '20px', borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 1001, maxHeight: '400px', overflowY: 'auto'
                    }}>
                        <h4 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Emergency Contacts</h4>

                        {/* List */}
                        <div style={{ marginBottom: '15px' }}>
                            {user.sosContacts.length === 0 ? (
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No contacts added yet.</p>
                            ) : (
                                user.sosContacts.map((c, i) => (
                                    <div key={i} style={{ background: '#f8fafc', padding: '8px', borderRadius: '8px', marginBottom: '5px', fontSize: '0.9rem' }}>
                                        <strong>{c.name}</strong> <br /> <span style={{ color: '#64748b' }}>{c.phone}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <h5 style={{ margin: '10px 0 5px 0', fontSize: '0.8rem', color: '#64748b' }}>Add New Contact</h5>
                        <input id="new-contact-name" placeholder="Name" style={{ width: '90%', padding: '8px', margin: '5px 0', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
                        <input id="new-contact-phone" placeholder="Phone (with code)" style={{ width: '90%', padding: '8px', margin: '5px 0', border: '1px solid #e2e8f0', borderRadius: '6px' }} />

                        <button
                            onClick={() => {
                                const name = document.getElementById('new-contact-name').value;
                                const phone = document.getElementById('new-contact-phone').value;
                                if (name && phone) saveSosContact(name, phone);
                            }}
                            style={{ width: '100%', padding: '8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', marginTop: '5px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Add Contact
                        </button>
                    </div>
                )}
            </div>

            <div className="controls-container">
                <div className="header-section">
                    <div className="status-badge">
                        <div className="live-indicator"></div>
                        <span className="status-text">{statusMessage}</span>
                    </div>
                    {user && <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '500' }}>{user.sosContacts.length} Contacts Active</span>}
                </div>

                <div className="sos-section">
                    <button className={`sos-button ${sosActive ? 'active' : ''}`} onClick={handleSOS}>
                        <span className="sos-label">SOS</span>
                        <span className="sos-subtext">Click to Send</span>
                    </button>
                </div>

                <div className="nearby-places-section">
                    <h3 className="section-title">Nearby Safe Places & Routes</h3>
                    <div className="places-list">
                        {nearbyPlaces.map((place) => (
                            <div
                                key={place.id}
                                className="place-card clickable"
                                onClick={() => handlePlaceClick(place)}
                                title="Click to view route"
                            >
                                <div className={`place-icon ${place.styleClass}`}>
                                    <place.icon size={20} />
                                </div>
                                <div className="place-info">
                                    <span className="place-name">{place.name}</span>
                                    <span className="place-type">{place.type}</span>
                                </div>
                                <div className="place-action">
                                    <Navigation size={18} color="#0f172a" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Safety Reviews Section */}
            <SafetyReviews />
        </div>
    );
};

export default SafetyPage;
