import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">We're Here to Help</h1>
                    <p className="text-lg text-slate-600">
                        Have questions or need support? Our team is available 24/7 to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Email Us</h3>
                            <p className="text-slate-500 mb-4 text-sm">For general inquiries and support.</p>
                            <a href="mailto:support@hervanguard.com" className="text-purple-600 font-bold hover:underline">
                                support@hervanguard.com
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Emergency Hotline</h3>
                            <p className="text-slate-500 mb-4 text-sm">Urgent safety concerns (24/7).</p>
                            <a href="tel:1-800-SAFE-HER" className="text-pink-600 font-bold hover:underline">
                                1-800-SAFE-HER
                            </a>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl shadow-lg text-white">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" /> Live Chat
                            </h3>
                            <p className="text-indigo-100 mb-6 text-sm">
                                Chat with our support team instantly regarding any app issues.
                            </p>
                            <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                                Start Chat
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-10">
                            {submitted ? (
                                <div className="text-center py-20 animate-in fade-in zoom-in">
                                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 mb-8">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-purple-600 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a message</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                        <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                                            <option>General Support</option>
                                            <option>Report a Bug</option>
                                            <option>Safety Feedback</option>
                                            <option>Partnership Inquiry</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                        <textarea
                                            rows="5"
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="How can we help you?"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" /> Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* FAQ Snippet */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-purple-500" /> Is my location data private?
                            </h4>
                            <p className="text-slate-600 text-sm">Yes, absolutely. We use end-to-end encryption and only share your location with contacts you explicitly trust.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-purple-500" /> How does the SOS button work?
                            </h4>
                            <p className="text-slate-600 text-sm">One tap sends your live location and a distress message to your trusted circle and local authorities immediately.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
