import { Eye, MapPin, Bell, Users, AlertTriangle, Navigation, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SafetyFeatures() {
    const navigate = useNavigate();
    const features = [

        {
            icon: MapPin,
            title: "Smart Location Tracking",
            tag: "ML Model",
            description: "Predictive analysis of unsafe locations based on historical data, time of day, and crowd patterns to suggest safer routes.",
            color: "bg-pink-500",
            tagColor: "bg-pink-50 text-pink-600",
            borderColor: "border-pink-200"
        },
        {
            icon: Bell,
            title: "Instant SOS Alert",
            tag: "Emergency",
            description: "One-tap emergency activation that instantly alerts your trusted contacts, local authorities, and shares your live location.",
            color: "bg-rose-500",
            tagColor: "bg-rose-50 text-rose-600",
            borderColor: "border-rose-200"
        },
        {
            icon: Users,
            title: "Trusted Circle Network",
            tag: "Community",
            description: "Build your safety network with family and friends who can track your journeys and receive instant alerts in emergencies.",
            color: "bg-purple-500",
            tagColor: "bg-purple-50 text-purple-600",
            borderColor: "border-purple-200"
        },

        {
            icon: Navigation,
            title: "Safe Route Navigation",
            tag: "Navigation",
            description: "Get route recommendations based on safety scores, well-lit areas, police stations, and community safety reports.",
            color: "bg-indigo-500",
            tagColor: "bg-indigo-50 text-indigo-600",
            borderColor: "border-indigo-200"
        },
        {
            icon: Heart,
            title: "Health Monitoring",
            tag: "Wellness",
            description: "Track your daily health metrics, sleep patterns, and stress levels with our AI-powered health assistant.",
            color: "bg-teal-500",
            tagColor: "bg-teal-50 text-teal-600",
            borderColor: "border-teal-200"
        }
    ];

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 font-medium text-sm mb-6 border border-purple-200">
                        🛡️ Safety Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Protection <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">That Never Sleeps</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Our intelligent safety system uses cutting-edge AI to keep you protected 24/7,
                        analyzing threats and responding faster than any human could.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (feature.title === "Smart Location Tracking" || feature.title === "Safe Route Navigation") {
                                    navigate('/safety');
                                } else if (feature.title === "Health Monitoring") {
                                    navigate('/health');
                                }
                            }}
                            className={`group p-8 rounded-3xl bg-white border ${feature.borderColor} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${(feature.title === "Smart Location Tracking" || feature.title === "Safe Route Navigation" || feature.title === "Health Monitoring") ? 'cursor-pointer hover:border-pink-300' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg shadow-slate-200 text-white`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${feature.tagColor} border border-slate-100`}>
                                    {feature.tag}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
