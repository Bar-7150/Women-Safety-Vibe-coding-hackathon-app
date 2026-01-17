import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import HealthFeatures from '../components/home/HealthFeatures';
import SafetyFeatures from '../components/home/SafetyFeatures';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        // Navigate to dashboard and maybe open setup if needed
        navigate('/safety');
    };

    return (
        <div className="home-container">
            {/* Ambient Backgrounds */}
            <div className="glow-bg"></div>
            <div className="glow-bg-2"></div>

            <main className="hero-content">
                {/* Badge */}
                <div className="ai-badge">
                    <Shield size={18} fill="white" />
                    <span>You Are Not Alone, I am With You</span>
                </div>

                {/* Headline */}
                <h1 className="hero-title">
                    Your Friend  <br />
                   <span className="gradient-text"> Ensures  Your Security</span> <br />
                    For 24/7
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle">
                    herVanguard is more than just a friend, it's your vigilant guardian with women-centric design
                    to provide real-time safety monitoring and instant emergency response.
                </p>

                {/* Features List */}
                <div className="features-list">
                    <div className="feature-item">
                        <CheckCircle2 size={20} className="check-icon" />
                        <span>Real-time threat detection</span>
                    </div>
                    <div className="feature-item">
                        <CheckCircle2 size={20} className="check-icon" />
                        <span>AI health assistant</span>
                    </div>
                    <div className="feature-item">
                        <CheckCircle2 size={20} className="check-icon" />
                        <span>24/7 emergency support</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button onClick={handleStart} className="btn-primary-glow">
                        <Shield size={20} />
                        Start Protection Now
                        <ArrowRight size={20} style={{ marginLeft: 'auto' }} />
                    </button>

                    <button className="btn-secondary-outline">
                        
                        Health Monitoring
                    </button>
                </div>

                {/* Stats */}
                <div className="stats-section">
                    <div className="stat-item">
                        <span className="stat-number">99.9%</span>
                        <span className="stat-label">Uptime</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">&lt; 3s</span>
                        <span className="stat-label">Alert Response</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50K+</span>
                        <span className="stat-label">Women Protected</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label">AI Monitoring</span>
                    </div>
                </div>
            </main>

            {/* Safety Features Section */}
            <SafetyFeatures />

            {/* Health Features Section */}
            <HealthFeatures />
        </div>
    );
};

export default HomePage;
