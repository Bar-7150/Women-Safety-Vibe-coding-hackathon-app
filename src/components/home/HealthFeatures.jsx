import { Brain, Calendar, Activity, Stethoscope, Pill, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HealthFeatures() {
    const navigate = useNavigate();
    const features = [
        {
            icon: Brain,
            title: "AI Health Assistant",
            tag: "Agentic AI",
            description: "Get personalized health advice, symptom analysis, and early warning signs detection through our conversational AI assistant.",
            color: "bg-pink-500",
            tagColor: "bg-pink-100 text-pink-700",
            borderColor: "border-pink-200"
        },
        {
            icon: Calendar,
            title: "Smart Cycle Tracking",
            tag: "Prediction",
            description: "Intelligent menstrual and fertility tracking with predictions, mood patterns, and personalized wellness recommendations.",
            color: "bg-purple-500",
            tagColor: "bg-purple-100 text-purple-700",
            borderColor: "border-purple-200"
        },
        {
            icon: Activity,
            title: "Wellness Monitoring",
            tag: "Monitoring",
            description: "Track vital signs, sleep patterns, stress levels, and physical activity with AI-powered insights and recommendations.",
            color: "bg-blue-500",
            tagColor: "bg-blue-100 text-blue-700",
            borderColor: "border-blue-200"
        },
        {
            icon: Stethoscope,
            title: "Early Risk Detection",
            tag: "ML Model",
            description: "ML models trained on women's health data to detect early signs of PCOS, thyroid issues, and other conditions.",
            color: "bg-green-500",
            tagColor: "bg-green-100 text-green-700",
            borderColor: "border-green-200"
        },
        {
            icon: Pill,
            title: "Medication Reminders",
            tag: "Reminders",
            description: "Smart medication scheduling with drug interaction checks and adherence tracking for better health outcomes.",
            color: "bg-orange-500",
            tagColor: "bg-orange-100 text-orange-700",
            borderColor: "border-orange-200"
        },
        {
            icon: Moon,
            title: "Mental Wellness",
            tag: "Wellness",
            description: "AI-guided meditation, mood tracking, and mental health resources specifically designed for women's unique needs.",
            color: "bg-indigo-500",
            tagColor: "bg-indigo-100 text-indigo-700",
            borderColor: "border-indigo-200"
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-[10%] w-64 h-64 bg-pink-100/50 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-purple-100/50 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-6 shadow-sm border border-pink-200">
                        ❤️ Health Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Intelligent Health Insights <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            Personalized for You
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Our AI understands women's unique health needs, providing proactive care,
                        early detection, and personalized wellness guidance.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate('/health')}
                            className={`group p-8 rounded-3xl bg-white border ${feature.borderColor} shadow-lg shadow-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:border-pink-300`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg shadow-slate-100 text-white`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${feature.tagColor}`}>
                                    {feature.tag}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
