import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Shield, Heart, Info, Phone, Sparkles, Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Safety", icon: Shield },
    { href: "/health", label: "Health", icon: Heart },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('userEmail');

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.reload();
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img src="/src/assets/logo.png" alt="Her Vanguard" className="w-10 h-10 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform" />
                    <span className="font-bold text-xl text-slate-800">
                        harVanguard
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${isActive
                                    ? "bg-purple-100 text-purple-700"
                                    : "text-slate-600 hover:text-purple-600"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Auth Section */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors">
                                Welcome, <span className="text-purple-600 font-bold">{localStorage.getItem('userName') || 'User'}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2.5 rounded-full bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-purple-50 text-slate-600"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-purple-50 shadow-lg">
                    <div className="px-6 py-4 space-y-2">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "bg-purple-50 text-purple-700"
                                        : "text-slate-600 hover:bg-purple-50"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="pt-2 mt-2 border-t border-slate-100">
                            {isAuthenticated ? (
                                <>
                                    <div className="px-4 py-2 text-sm text-slate-600 mb-2">
                                        Welcome, <span className="font-medium text-purple-600">{localStorage.getItem('userName') || 'User'}</span>
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm text-center shadow-lg"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
