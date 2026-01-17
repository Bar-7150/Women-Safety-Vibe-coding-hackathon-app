import { useState, useEffect } from 'react';
import { Star, ShieldAlert, ShieldCheck, MapPin, Plus, ArrowLeft } from 'lucide-react';

const DUMMY_REVIEWS = [
    {
        id: 1,
        location: "Central Park West Path",
        rating: 2,
        tag: "Poor Lighting",
        comment: "Very dark after 8 PM, lights have been broken for weeks.",
        date: "2023-10-25"
    },
    {
        id: 2,
        location: "Main Street Bus Stop",
        rating: 5,
        tag: "Safe",
        comment: "Always busy, police patrol nearby usually visible.",
        date: "2023-10-24"
    },
    {
        id: 3,
        location: "Underpass near 5th",
        rating: 1,
        tag: "Harassment",
        comment: "Avoid this area at night. Several reports of catcalling.",
        date: "2023-10-26"
    }
];

export default function SafetyReviews({ onBack }) {
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        location: '',
        rating: 3,
        tag: 'General',
        comment: ''
    });

    useEffect(() => {
        const saved = localStorage.getItem('soshub_safety_reviews');
        if (saved) {
            setReviews(JSON.parse(saved));
        } else {
            setReviews(DUMMY_REVIEWS);
            localStorage.setItem('soshub_safety_reviews', JSON.stringify(DUMMY_REVIEWS));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.location || !formData.comment) return;

        const newReview = {
            id: Date.now(),
            ...formData,
            date: new Date().toISOString().split('T')[0]
        };

        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem('soshub_safety_reviews', JSON.stringify(updatedReviews));

        // Reset and close
        setFormData({ location: '', rating: 3, tag: 'General', comment: '' });
        setShowForm(false);
    };

    return (
        <div className="reviews-container">
            <div className="nav-header">
                <button className="back-btn" onClick={onBack}><ArrowLeft /></button>
                <h2>Community Safety</h2>
            </div>

            {!showForm ? (
                <>
                    <button className="action-btn" onClick={() => setShowForm(true)}>
                        <Plus /> Report Incident / Review
                    </button>

                    <div className="reviews-list">
                        <h3 style={{ marginTop: '1.5rem', textAlign: 'left' }}>Recent Reports</h3>
                        {reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="review-title">
                                        <MapPin size={16} />
                                        <strong>{review.location}</strong>
                                    </div>
                                    <span className={`review-tag ${getRiskClass(review.rating)}`}>
                                        {review.tag}
                                    </span>
                                </div>

                                <div className="review-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? "gold" : "none"}
                                            color={i < review.rating ? "gold" : "gray"}
                                        />
                                    ))}
                                    <span className="review-date">{review.date}</span>
                                </div>

                                <p className="review-comment">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="review-form">
                    <h3>Submit Safety Report</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Location / Path Name</label>
                            <input
                                type="text"
                                placeholder="e.g. 4th Ave Subway Entrance"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Safety Rating (1 = Danger, 5 = Safe)</label>
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <button
                                        type="button"
                                        key={num}
                                        className={`rating-btn ${formData.rating === num ? 'selected' : ''}`}
                                        onClick={() => setFormData({ ...formData, rating: num })}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Main Concern / Tag</label>
                            <select
                                value={formData.tag}
                                onChange={e => setFormData({ ...formData, tag: e.target.value })}
                            >
                                <option>General</option>
                                <option>Poor Lighting</option>
                                <option>Harassment</option>
                                <option>Theft Risk</option>
                                <option>Crowded</option>
                                <option>Isolated</option>
                                <option>Safe</option>
                                <option>Police Present</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                rows="3"
                                placeholder="Describe what you saw or why this place is safe/unsafe..."
                                value={formData.comment}
                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="action-btn">Submit Report</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

function getRiskClass(rating) {
    if (rating <= 2) return 'tag-danger';
    if (rating === 3) return 'tag-warning';
    return 'tag-safe';
}
