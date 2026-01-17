import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Share2, Play, AlertCircle } from 'lucide-react';
import { db } from './db';

export default function VideoGallery({ onBack }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const storedVideos = await db.getAllVideos();
            setVideos(storedVideos);
        } catch (error) {
            console.error("Failed to load videos", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (confirm("Delete this video permanently?")) {
            await db.deleteVideo(id);
            loadVideos();
            if (selectedVideo && selectedVideo.id === id) {
                setSelectedVideo(null);
            }
        }
    };

    const handleShare = async (video, e) => {
        e.stopPropagation();
        const file = new File([video.blob], `sos-evidence-${video.id}.webm`, { type: 'video/webm' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'SOS Recording',
                    text: `Evidence recorded on ${video.date}`
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            // Fallback download
            const url = URL.createObjectURL(video.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sos-evidence-${video.id}.webm`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            alert("Video downloaded.");
        }
    };

    // Helper to get URL (memoization would be better in prod but this is fine)
    const getUrl = (blob) => URL.createObjectURL(blob);

    return (
        <div className="gallery-container">
            <div className="nav-header">
                <button className="back-btn" onClick={onBack}><ArrowLeft /></button>
                <h2>Evidence Gallery</h2>
            </div>

            {loading ? (
                <p>Loading videos...</p>
            ) : videos.length === 0 ? (
                <div className="empty-state">
                    <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
                    <p>No recordings found.</p>
                    <small>Videos recorded in the app will appear here.</small>
                </div>
            ) : (
                <div className="video-grid">
                    {videos.map(video => (
                        <div key={video.id} className="video-card" onClick={() => setSelectedVideo(video)}>
                            <div className="video-thumbnail">
                                <div className="play-icon"><Play fill="white" /></div>
                                {/* We can't easily generate thumbnails from webm blobs without canvas processing, 
                        so we use a placeholder or just a black box with icon */}
                            </div>
                            <div className="video-info">
                                <span className="video-date">{video.date}</span>
                                <div className="video-actions">
                                    <button className="icon-btn-small" onClick={(e) => handleShare(video, e)}>
                                        <Share2 size={16} />
                                    </button>
                                    <button className="icon-btn-small delete" onClick={(e) => handleDelete(video.id, e)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedVideo && (
                <div className="video-modal-overlay" onClick={() => setSelectedVideo(null)}>
                    <div className="video-modal" onClick={e => e.stopPropagation()}>
                        <h3>Recording: {selectedVideo.date}</h3>
                        <video controls autoPlay src={getUrl(selectedVideo.blob)} className="modal-video" />
                        <div className="modal-actions">
                            <button className="action-btn" onClick={(e) => handleShare(selectedVideo, e)}>
                                <Share2 /> Share Evidence
                            </button>
                            <button className="secondary-btn" onClick={() => setSelectedVideo(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
