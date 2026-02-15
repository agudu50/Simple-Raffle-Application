import { useState, useEffect } from "react";

export default function LandingPage({ onEnter }) {
  const [isVisible, setIsVisible] = useState(false);
  const [ticketsAnimated, setTicketsAnimated] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setTicketsAnimated(true), 600);
  }, []);

  const floatingTickets = [
    { emoji: "🎟️", delay: "0s", duration: "3s", left: "10%", size: "text-3xl" },
    { emoji: "🎫", delay: "0.5s", duration: "4s", left: "25%", size: "text-2xl" },
    { emoji: "🎟️", delay: "1s", duration: "3.5s", left: "40%", size: "text-4xl" },
    { emoji: "🎫", delay: "0.3s", duration: "4.5s", left: "60%", size: "text-2xl" },
    { emoji: "🎟️", delay: "0.8s", duration: "3s", left: "75%", size: "text-3xl" },
    { emoji: "🎫", delay: "1.2s", duration: "4s", left: "90%", size: "text-xl" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingTickets.map((ticket, index) => (
          <div
            key={index}
            className={`absolute ${ticket.size} ${ticketsAnimated ? "animate-float" : "opacity-0"}`}
            style={{
              left: ticket.left,
              animationDelay: ticket.delay,
              animationDuration: ticket.duration,
              top: "100%",
            }}
          >
            {ticket.emoji}
          </div>
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200/50 dark:bg-indigo-900/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/50 dark:bg-amber-900/20 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Logo/Icon */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${isVisible ? "scale-100" : "scale-50"}`}>
          <div className="inline-block p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl">
            <span className="text-7xl sm:text-8xl animate-bounce inline-block">🎟️</span>
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-800 dark:text-white mb-4 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          Raffle Draw
        </h1>

        {/* Subtitle */}
        <p className={`text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          Pick your lucky winners with style ✨
        </p>

        {/* Features pills */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          {["🎲 Random Draw", "🏆 Multi-Winner", "🎁 Prizes", "🌙 Dark Mode"].map((feature, idx) => (
            <span
              key={idx}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className={`group relative px-8 sm:px-10 py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ transitionDelay: "900ms" }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Get Started
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Bottom hint */}
        <p className={`mt-8 text-slate-500 dark:text-slate-500 text-sm transition-all duration-700 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          💾 Your data is saved locally
        </p>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 sm:h-24 fill-indigo-100 dark:fill-slate-800">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>

      {/* Custom styles for floating animation */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
