import { useState, useEffect } from 'react';
import { Star, MapPin, Plus, ArrowLeft, Send, X } from 'lucide-react';

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

export default function SafetyReviews() {
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
        <div className="bg-slate-50 py-12 rounded-3xl mt-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            🛡️ Community Safety Reviews
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Real experiences from women in your area</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                            <Plus size={18} /> Report Incident
                        </button>
                    )}
                </div>

                {/* Report Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-purple-100 animate-in fade-in slide-in-from-top-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Submit Safety Report</h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Location / Path Name</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="e.g. 4th Ave Subway Entrance"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Safety Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <button
                                            type="button"
                                            key={num}
                                            onClick={() => setFormData({ ...formData, rating: num })}
                                            className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${formData.rating === num
                                                    ? 'bg-purple-600 text-white shadow-md scale-105'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                    <span className="ml-2 flex items-center text-sm text-slate-500">
                                        (1 = Danger, 5 = Safe)
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Main Concern / Tag</label>
                                <select
                                    value={formData.tag}
                                    onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
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

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Describe what you saw or why this place is safe/unsafe..."
                                    value={formData.comment}
                                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                    required
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 shadow-md transition-all flex items-center gap-2"
                                >
                                    <Send size={18} /> Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${getRatingColor(review.rating)}`}>
                                        {review.rating}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                            {review.location}
                                        </h3>
                                        <span className="text-xs text-slate-400">{review.date}</span>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTagColor(review.tag)}`}>
                                    {review.tag}
                                </span>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed pl-14">
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getRatingColor(rating) {
    if (rating <= 2) return 'bg-red-500';
    if (rating === 3) return 'bg-orange-500';
    return 'bg-green-500';
}

function getTagColor(tag) {
    const dangerTags = ['Harassment', 'Theft Risk', 'Poor Lighting', 'Isolated'];
    const safeTags = ['Safe', 'Police Present', 'Crowded'];

    if (dangerTags.includes(tag)) return 'bg-red-50 text-red-600 border-red-100';
    if (safeTags.includes(tag)) return 'bg-green-50 text-green-600 border-green-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
}
