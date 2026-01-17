import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, BarChart, Users, Brain, Bell } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
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
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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

                    <h2 className="text-4xl font-bold mb-4">Your Safety Companion</h2>
                    <p className="text-lg text-white/90 mb-12">
                        Access powerful safety tools, health tracking, and emergency features designed to keep you safe and connected.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <BarChart className="w-8 h-8 mb-3" />
                            <h3 className="font-semibold mb-1">Safety Tracking</h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <Users className="w-8 h-8 mb-3" />
                            <h3 className="font-semibold mb-1">Emergency Contacts</h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <Brain className="w-8 h-8 mb-3" />
                            <h3 className="font-semibold mb-1">AI Safety Assistant</h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <Bell className="w-8 h-8 mb-3" />
                            <h3 className="font-semibold mb-1">Instant Alerts</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="mb-8">
                            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                🔐 User Portal
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                            <p className="text-slate-500">Sign in to access your safety dashboard</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address
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

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">
                                        Password
                                    </label>
                                    <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
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

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-600">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing in...' : 'Sign In →'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            New user? <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">Create Account</Link>
                        </p>

                        <p className="mt-6 text-xs text-center text-slate-400">
                            By signing in, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
