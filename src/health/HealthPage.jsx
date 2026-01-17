import React, { useState, useEffect } from 'react';
import { Brain, Moon, Activity, Calendar, Award, TrendingUp, Heart } from 'lucide-react';
import Navbar from '../components/layouts/Navbar';

export default function HealthPage() {
    const [user, setUser] = useState({ name: 'Guest' });
    const [healthScore, setHealthScore] = useState(85);

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUser({ name: storedName });
        }
    }, []);

    // Mock Data
    const sleepData = [6, 7, 5, 8, 7, 6, 7];
    const stressData = [3, 5, 2, 8, 4, 3, 2];
    const cycleDay = 12;
    const cyclePhase = "Follicular Phase";

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Health Overview</h1>
                    <p className="text-slate-500">Welcome back, {user.name}. Here's your daily wellness report.</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Score & Cycle */}
                    <div className="space-y-8">
                        {/* Health Score Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                            <h3 className="text-slate-500 font-medium mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-purple-500" /> Daily Health Score
                            </h3>

                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* Rings */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="96" cy="96" r="88" stroke="#10b981" strokeWidth="12" fill="none" className="opacity-10" />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="url(#scoreGradient)"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray="552"
                                        strokeDashoffset={552 - (552 * healthScore) / 100}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ec4899" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-5xl font-bold text-slate-800">{healthScore}</span>
                                    <span className="text-sm text-slate-400">/ 100</span>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-sm text-slate-500">
                                You're doing great! Keep up the good work.
                            </p>
                        </div>

                        {/* Menstrual Cycle Card */}
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 shadow-sm border border-pink-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-pink-900 font-bold flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-pink-500" /> Cycle Tracking
                                </h3>
                                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-pink-500 shadow-sm">
                                    Day {cycleDay}
                                </span>
                            </div>

                            <div className="mb-6">
                                <div className="text-sm text-pink-600 font-medium mb-1">Current Phase</div>
                                <div className="text-2xl font-bold text-slate-800">{cyclePhase}</div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Energy levels rising. Great time for exercise and creative work.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white/50 p-3 rounded-xl border border-pink-100">
                                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                Next period in approx. <span className="font-bold text-pink-600">16 days</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Metrics */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Sleep Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                                        <Moon className="w-5 h-5 text-indigo-500" /> Sleep Quality
                                    </h3>
                                    <span className="text-xs text-slate-400">Last 7 Days</span>
                                </div>
                                <div className="h-40 flex items-end justify-between px-2 gap-2">
                                    {sleepData.map((val, i) => (
                                        <div key={i} className="flex flex-col items-center w-full group">
                                            <div
                                                style={{ height: `${(val / 10) * 100}%` }}
                                                className="w-full bg-indigo-100 rounded-t-lg group-hover:bg-indigo-500 transition-colors relative"
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {val} hrs
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400 mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <div>
                                        <div className="text-xs text-slate-400">Avg. Sleep</div>
                                        <div className="text-lg font-bold text-slate-800">6.8 hrs</div>
                                    </div>
                                    <div className="text-green-500 text-xs font-medium flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-1" /> +12%
                                    </div>
                                </div>
                            </div>

                            {/* Stress Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-orange-500" /> Stress Levels
                                    </h3>
                                    <span className="text-xs text-slate-400">Last 7 Days</span>
                                </div>
                                <div className="h-40 flex items-end justify-between px-2 gap-2">
                                    {stressData.map((val, i) => (
                                        <div key={i} className="flex flex-col items-center w-full group">
                                            <div
                                                style={{ height: `${(val / 10) * 100}%` }}
                                                className={`w-full rounded-t-lg transition-colors relative ${val > 7 ? 'bg-red-200 group-hover:bg-red-500' : 'bg-orange-200 group-hover:bg-orange-500'}`}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Lvl {val}
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-400 mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <div>
                                        <div className="text-xs text-slate-400">Avg. Stress</div>
                                        <div className="text-lg font-bold text-slate-800">Low-Moderate</div>
                                    </div>
                                    <div className="text-green-500 text-xs font-medium flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-1" /> -5%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Assistant Integration */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                        <Brain className="w-6 h-6" /> AI Health Assistant
                                    </h3>
                                    <p className="text-purple-100 max-w-md">
                                        Based on your data, I noticed your sleep was lower on Wednesday.
                                        Would you like some guided meditation recommendations for tonight?
                                    </p>
                                </div>
                                <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors shadow-lg">
                                    Chat with AI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
