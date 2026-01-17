import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            if (response.data.success) {
                // Store token and user info
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userEmail', response.data.user.email);
                localStorage.setItem('userName', response.data.user.name);

                // Redirect to safety dashboard
                navigate('/safety');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Gradient Background with Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-12 flex-col justify-between text-white">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Shield className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl font-bold">herVanguard</h1>
                    </div>

                    <h2 className="text-4xl font-bold mb-4">Safety Control Center</h2>
                    <p className="text-lg text-white/90 mb-12">
                        Register to access safety features, health tracking, emergency SOS, and AI-powered protection tools.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Real-time location tracking</h3>
                                <p className="text-white/80 text-sm">Share your location with trusted contacts</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Emergency SOS system</h3>
                                <p className="text-white/80 text-sm">One-tap emergency alerts to your contacts</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Health & wellness tracking</h3>
                                <p className="text-white/80 text-sm">Monitor your health metrics and get insights</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">AI safety assistant</h3>
                                <p className="text-white/80 text-sm">Get personalized safety recommendations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="mb-8">
                            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                ⚡ Quick Registration
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Your Account</h2>
                            <p className="text-slate-500">Join thousands of women staying safe</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@example.com"
                                        required
                                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Phone (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Phone <span className="text-slate-400 text-xs">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 12345 67890"
                                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a strong password"
                                        required
                                        className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
                                        className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Create Account →'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Already have an account? <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
