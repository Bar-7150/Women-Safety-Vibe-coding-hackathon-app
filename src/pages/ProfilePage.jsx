import React, { useState, useEffect } from 'react';
import { User, Phone, Calendar, MapPin, Play, Video, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        if (!email) {
            navigate('/login');
            return;
        }
        fetchUser();
    }, [email]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${email}`);
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                        <p className="text-slate-500">{user.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                                <Phone size={16} /> {user.phone || 'No Phone'}
                            </span>
                            <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium flex items-center gap-2">
                                <User size={16} /> {user.sosContacts?.length || 0} Contacts
                            </span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2">
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* SOS Recordings Section */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Video className="text-pink-500" /> SOS Recordings History
                    </h2>

                    {user.sosEvents?.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <Video size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700">No Recordings Yet</h3>
                            <p className="text-slate-500">When you activate SOS, video evidence will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {user.sosEvents?.slice().reverse().map((event, index) => (
                                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="aspect-video bg-black relative group">
                                        {event.videoUrl ? (
                                            <video
                                                controls
                                                className="w-full h-full object-cover"
                                                src={`http://localhost:5000${event.videoUrl}`}
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-500">
                                                No Video Available
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-pink-500 uppercase tracking-wider bg-pink-50 px-2 py-1 rounded-md">
                                                Emergency Alert
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(event.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                                            <MapPin size={16} />
                                            <span>Lat: {event.location?.lat.toFixed(4)}, Lng: {event.location?.lng.toFixed(4)}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-2">
                                            {new Date(event.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
