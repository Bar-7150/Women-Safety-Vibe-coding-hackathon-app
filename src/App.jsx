import { useState, useRef, useEffect } from 'react';
import { Camera, Phone, MapPin, X, Trash2, Share2, Video, StopCircle, ArrowLeft, Siren, Users, FolderOpen } from 'lucide-react';
import './App.css';
import SafetyReviews from './SafetyReviews';
import VideoGallery from './VideoGallery';
import { db } from './db';

function App() {
  const [view, setView] = useState('home'); // home, camera, contacts, reviews, gallery
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('soshub_contacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [location, setLocation] = useState(null);

  // Camera refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  // Get location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Error getting location", error)
      );
    }
  }, []);

  // Save contacts
  useEffect(() => {
    localStorage.setItem('soshub_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (newNumber.trim()) {
      setContacts([...contacts, { id: Date.now(), name: newName || 'Contact', number: newNumber.trim() }]);
      setNewNumber('');
      setNewName('');
    }
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const sendWhatsAppMessages = () => {
    if (contacts.length === 0) {
      alert("Please add emergency contacts first!");
      setView('contacts');
      return false;
    }

    const locString = location
      ? `https://maps.google.com/?q=${location.lat},${location.lng}`
      : "Location unavailable";

    // Add instruction about video if we are in camera mode
    const extraText = view === 'camera' ? " (Video evidence captured/downloaded)" : "";
    const message = encodeURIComponent(`SOS! I need help. My location: ${locString}${extraText}`);

    contacts.forEach(contact => {
      let cleanNumber = contact.number.replace(/[^\d+]/g, '');
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    });
    return true;
  };

  const handleSOS = () => {
    const confirmed = confirm(`This will open WhatsApp for ${contacts.length} contacts. Continue?`);
    if (!confirmed) return;
    sendWhatsAppMessages();
  };

  // Combined SOS in Camera: Stop, Save, Message, Share
  const handleCameraSOS = async () => {
    if (contacts.length === 0) {
      alert("No contacts saved! Please add contacts first.");
      setView('contacts');
      return;
    }

    // 1. Send Text Alerts First
    sendWhatsAppMessages();

    // 2. Stop Recording & Process Video
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // The onstop handler will save to DB and prompt share
    } else {
      handleShareVideo();
    }
  };

  const startCamera = async () => {
    setView('camera');
    setVideoUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera", err);
      alert("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setView('home');
    setVideoUrl(null);
    setIsRecording(false);
  };

  const handleStartRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    const stream = videoRef.current.srcObject;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);

      // Save directly to DB
      try {
        await db.saveVideo(blob);
        console.log("Video saved to gallery");
      } catch (err) {
        console.error("Failed to save video", err);
      }

      handleShareBlob(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleShareBlob = async (blob) => {
    // Just helper hook if we want auto-share logic later
  };

  const handleShareVideo = async () => {
    if (!videoUrl) return;
    try {
      const blob = await fetch(videoUrl).then(r => r.blob());
      await shareOrDownload(blob);
    } catch (e) {
      console.error(e);
    }
  };

  const shareOrDownload = async (blob) => {
    const file = new File([blob], "sos-evidence.webm", { type: "video/webm" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'SOS Recording',
          text: 'Emergency Recording captured via HerVanguard'
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Share failed", err);
          downloadFallback(blob);
        }
      }
    } else {
      downloadFallback(blob);
    }
  };

  const downloadFallback = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sos-evidence-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert("Video downloaded & Saved to Gallery.");
  };

  // Render Functions
  const renderHome = () => (
    <div className="home-container">
      <h1>HerVanguard</h1>

      <button className="sos-btn" onClick={handleSOS}>
        <Siren size={64} />
        <span className="sos-text">SOS</span>
      </button>

      <button className="action-btn" onClick={startCamera}>
        <Camera /> Record Evidence
      </button>

      <div className="grid-buttons">
        <button className="action-btn secondary-btn" onClick={() => setView('contacts')}>
          <Phone /> Contacts
        </button>
        <button className="action-btn secondary-btn" onClick={() => setView('gallery')}>
          <FolderOpen /> Gallery
        </button>
      </div>

      <button className="action-btn" style={{ backgroundColor: '#7c3aed', marginTop: '0.5rem' }} onClick={() => setView('reviews')}>
        <Users /> Community Safety
      </button>

      <div className="location-status">
        <MapPin size={16} />
        {location ? " Location Active" : " Finding Location..."}
      </div>
    </div>
  );

  const renderCamera = () => (
    <div className="camera-container">
      <div className="camera-top-bar">
        <button className="icon-btn" onClick={stopCamera}>
          <ArrowLeft />
        </button>
        <button className="sos-btn-mini" onClick={handleCameraSOS}>
          SOS
        </button>
      </div>

      {videoUrl ? (
        <video src={videoUrl} controls autoPlay className="recorded-video" />
      ) : (
        <video ref={videoRef} autoPlay playsInline muted />
      )}

      <div className="camera-controls">
        {!videoUrl && (
          <button
            className={`record-btn ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
          </button>
        )}

        {videoUrl && (
          <button className="action-btn" onClick={handleShareVideo}>
            <Share2 /> Share Evidence
          </button>
        )}

        {videoUrl && (
          <button className="icon-btn" style={{ marginLeft: '10px' }} onClick={() => { setVideoUrl(null); startCamera(); }}>
            <X />
          </button>
        )}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="contacts-container">
      <div className="nav-header">
        <button className="back-btn" onClick={() => setView('home')}><ArrowLeft /></button>
        <h2>Emergency Contacts</h2>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number (w/ Country Code)"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <button className="action-btn" onClick={addContact}>Add Contact</button>

      <div className="contact-list">
        {contacts.length === 0 && <p className="empty-state">No contacts saved yet.</p>}
        {contacts.map(contact => (
          <div key={contact.id} className="contact-item">
            <div>
              <strong>{contact.name}</strong>
              <div>{contact.number}</div>
            </div>
            <button className="delete-btn" onClick={() => removeContact(contact.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {view === 'home' && renderHome()}
      {view === 'camera' && renderCamera()}
      {view === 'contacts' && renderContacts()}
      {view === 'reviews' && <SafetyReviews onBack={() => setView('home')} />}
      {view === 'gallery' && <VideoGallery onBack={() => setView('home')} />}
    </>
  );
}

export default App;
