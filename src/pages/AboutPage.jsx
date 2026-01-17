import React from 'react';
import { Shield, Users, Heart, Lock, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500 py-24 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-bold mb-6">
                        🚀 Our Mission
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Empowering Women Through <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200">Innovation & Safety</span>
                    </h1>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                        Her Vanguard is more than an app. It's a movement to reclaim public spaces and ensure every woman feels safe, confident, and connected.
                    </p>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Why We Build</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        We believe safety is a fundamental right. Our core values drive every feature we build.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
                            <Shield className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Safety First</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We prioritize real-time protection and rapid emergency response above all else. Your security is our obsession.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Community Power</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Safety in numbers. We build networks of trust, allowing women to protect and support one another globally.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Privacy & Trust</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Your data is yours. We use advanced encryption and strict privacy protocols to ensure your location stays private.
                        </p>
                    </div>
                </div>
            </div>

            {/* Story/Team Section */}
            <div className="bg-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[2rem] opacity-20 blur-lg"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                                    alt="Team collaborating"
                                    className="relative rounded-3xl shadow-2xl w-full"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-800 mb-6">Built by Women, for Women</h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Her Vanguard started as a hackathon project with a simple goal: to make walking home alone less scary. Today, it has grown into a comprehensive safety companion used by thousands.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Our diverse team of engineers, designers, and safety experts works tirelessly to push the boundaries of what technology can do for personal security.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-3xl font-bold text-purple-600 mb-1">50K+</div>
                                    <div className="text-sm text-slate-500 font-medium">Active Users</div>
                                </div>
                                <div className="text-center px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-3xl font-bold text-pink-600 mb-1">24/7</div>
                                    <div className="text-sm text-slate-500 font-medium">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-20 text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Ready to join the movement?</h2>
                <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-1"
                >
                    Get Started Today
                </Link>
            </div>
        </div>
    );
}
