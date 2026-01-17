import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin, Twitter, Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/src/assets/logo.png" alt="Her Vanguard" className="w-10 h-10 rounded-xl shadow-lg shadow-purple-500/20" />
                            <span className="font-bold text-lg text-slate-800">
                                Her Vanguard
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Empowering women through AI-driven safety and health solutions. Your trusted companion for a safer, healthier life.
                        </p>
                        <div className="space-y-2 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>contact@sheguard.ai</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+91 (23) 456-7890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Ahmedabad, Gujarat, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/dashboard" className="text-slate-500 hover:text-purple-600 transition-colors">Safety Features</Link></li>
                            <li><Link to="/health" className="text-slate-500 hover:text-purple-600 transition-colors">Health Tracking</Link></li>
                            <li><Link to="/assistant" className="text-slate-500 hover:text-purple-600 transition-colors">AI Assistant</Link></li>
                            <li><Link to="/emergency" className="text-slate-500 hover:text-purple-600 transition-colors">Emergency SOS</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-slate-500 hover:text-purple-600 transition-colors">About Us</Link></li>
                            <li><Link to="/mission" className="text-slate-500 hover:text-purple-600 transition-colors">Our Mission</Link></li>
                            <li><Link to="/careers" className="text-slate-500 hover:text-purple-600 transition-colors">Careers</Link></li>
                            <li><Link to="/press" className="text-slate-500 hover:text-purple-600 transition-colors">Press Kit</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/docs" className="text-slate-500 hover:text-purple-600 transition-colors">Documentation</Link></li>
                            <li><Link to="/api" className="text-slate-500 hover:text-purple-600 transition-colors">API Reference</Link></li>
                            <li><Link to="/support" className="text-slate-500 hover:text-purple-600 transition-colors">Support Center</Link></li>
                            <li><Link to="/community" className="text-slate-500 hover:text-purple-600 transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/privacy" className="text-slate-500 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-slate-500 hover:text-purple-600 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookies" className="text-slate-500 hover:text-purple-600 transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/gdpr" className="text-slate-500 hover:text-purple-600 transition-colors">GDPR</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © 2026 SheGuard AI. All rights reserved. Built for COGNIVA Hackathon.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-purple-600 transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-purple-600 transition-all">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-purple-600 transition-all">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-purple-50 flex items-center justify-center text-slate-500 hover:text-purple-600 transition-all">
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
