"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Wifi,
  Battery,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Share,
  LayoutGrid,
  Plus,
  Server,
  Eye,
  Zap,
  Sparkles,
} from "lucide-react";

const AnimationStyles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes textReveal {
      from { clip-path: inset(0 100% 0 0); }
      to { clip-path: inset(0 0 0 0); }
    }
    @keyframes borderDance {
      0%, 100% { border-color: rgba(59, 130, 246, 0.5); }
      25% { border-color: rgba(16, 185, 129, 0.5); }
      50% { border-color: rgba(139, 92, 246, 0.5); }
      75% { border-color: rgba(236, 72, 153, 0.5); }
    }
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
      25% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.8; }
      50% { transform: translateY(-10px) translateX(-10px) scale(0.9); opacity: 0.4; }
      75% { transform: translateY(-30px) translateX(5px) scale(1.05); opacity: 0.7; }
    }
    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-text-reveal { animation: textReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-border-dance { animation: borderDance 4s ease-in-out infinite; }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }
    .delay-600 { animation-delay: 600ms; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
  `}</style>
);

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top = `${e.clientY - 4}px`;
      }

      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${e.clientX - 3}px`;
      trail.style.top = `${e.clientY - 3}px`;
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.remove();
      }, 500);
    };

    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x - 20}px`;
        ringRef.current.style.top = `${ringPos.current.y - 20}px`;
      }
      
      requestAnimationFrame(animateRing);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        hoveringRef.current = true;
        if (ringRef.current) {
          ringRef.current.classList.add('hovering');
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        hoveringRef.current = false;
        if (ringRef.current) {
          ringRef.current.classList.remove('hovering');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    
    const animationId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

const FloatingParticles = () => {
  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: 2 + (i % 4),
    left: (i * 3.33) % 100,
    top: (i * 7) % 100,
    delay: (i * 0.5) % 5,
    duration: 10 + (i % 10),
    color: colors[i % 5]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            animation: `particleFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`
          }}
        />
      ))}
    </div>
  );
};

const GlowingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute w-[600px] h-[600px] rounded-full animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          filter: 'blur(60px)',
          animation: 'float 15s ease-in-out infinite, morph 20s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
          filter: 'blur(80px)',
          animation: 'float 20s ease-in-out infinite reverse'
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
          filter: 'blur(70px)',
          animation: 'float 18s ease-in-out infinite 2s'
        }}
      />
    </div>
  );
};

const ContactParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 5) % 100,
      top: (i * 7) % 100,
      duration: 5 + (i % 5),
      delay: (i * 0.1) % 2
    })), []
  );

  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-zinc-500/30 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `particleFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center font-sans selection:bg-white/20 text-white relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1621683759714-41d3a0492815?q=80&w=2070&auto=format&fit=crop')`,
      }}
    >
      <AnimationStyles />
      <CustomCursor />
      <FloatingParticles />
      <GlowingOrbs />

      <div className="absolute top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 z-50 text-xs font-medium border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-lg pb-1 text-white/90 animate-bounce-subtle"></div>
          <span className="font-bold cursor-default text-white">Finder</span>
          {["File", "Edit", "View", "Go", "Window", "Help"].map((item, i) => (
            <span
              key={item}
              className="hidden md:inline cursor-default opacity-90 hover:opacity-100 transition-all hover:scale-105"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 cursor-default">
          <span className="hidden md:inline opacity-90 hover:text-zinc-400 transition-colors">
            <Battery className="w-3.5 h-3.5 inline mr-1" /> 100%
          </span>
          <span className="hidden md:inline opacity-90 hover:text-blue-400 transition-colors">
            <Wifi className="w-3.5 h-3.5 inline animate-pulse" />
          </span>
          <span className="hover:text-purple-400 transition-colors">
            <Search className="w-3.5 h-3.5 inline" />
          </span>
          <span className="animate-pulse">
            {time.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
            <span className="ml-2">
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </span>
        </div>
      </div>

      <div className="absolute inset-0 top-8 bottom-4 flex items-center justify-center p-2 md:p-4 transition-all duration-700 ease-out">
        <SafariWindow />
      </div>
    </div>
  );
}

const SafariWindow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setScrollProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    }
  };

  return (
    <div className="w-full h-full max-w-[1600px] bg-[#050505] rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden relative group hover-glow transition-all duration-500">
      <div className="h-12 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 shrink-0 z-40 gap-4 transition-colors duration-300">
        <div className="flex items-center gap-2 w-16">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-110 cursor-pointer shadow-sm hover:scale-125 transition-transform hover:animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] hover:brightness-110 cursor-pointer shadow-sm hover:scale-125 transition-transform hover:animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] hover:brightness-110 cursor-pointer shadow-sm hover:scale-125 transition-transform hover:animate-pulse"></div>
        </div>

        <div className="flex items-center gap-4 text-neutral-500">
          <LayoutGrid className="w-4 h-4 hover:text-white transition-colors cursor-pointer hover:rotate-90 transition-all duration-300" />
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-4 h-4 hover:text-white transition-colors cursor-pointer hover:-translate-x-1 transition-transform" />
            <ChevronRight className="w-4 h-4 hover:text-white transition-colors cursor-pointer hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-auto">
          <div className="h-8 bg-[#0a0a0a] rounded-lg flex items-center justify-center relative group border border-white/5 hover:border-zinc-500/50 hover:bg-[#151515] transition-all cursor-text shadow-inner animate-border-dance">
            <Lock className="w-3 h-3 text-neutral-500 absolute left-3 group-hover:text-zinc-500 transition-colors group-hover:animate-bounce-subtle" />
            <div className="text-xs text-neutral-400 font-medium group-hover:text-white flex items-center gap-1 transition-colors">
              <span className="text-neutral-600">https://</span>
              <span className="group-hover:text-gradient-animated">clivetsungu.xyz</span>
            </div>
            <RotateCw className="w-3 h-3 text-neutral-500 absolute right-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:rotate-180 duration-500" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-neutral-500 w-16 justify-end">
          <Share className="w-4 h-4 hover:text-white transition-colors cursor-pointer hover:scale-110 transition-transform" />
          <Plus className="w-4 h-4 hover:text-white transition-colors cursor-pointer hover:rotate-90 transition-all duration-300" />
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden relative bg-[#050505] scroll-smooth"
      >
        <PortfolioContent
          scrollToSection={(id: string) => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <div
          className="fixed top-[48px] left-0 h-[2px] bg-gradient-to-r from-zinc-400 via-white to-zinc-400 z-50 transition-all duration-100 ease-out shadow-lg"
          style={{ 
            width: `${scrollProgress}%`,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(161, 161, 170, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

const PortfolioContent = ({
  scrollToSection,
}: {
  scrollToSection: (id: string) => void;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50,
    });
  }, []);

  return (
    <div className="min-h-full bg-[#050505] text-neutral-200 font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <section 
        className="min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-16 max-w-7xl mx-auto text-center relative z-10"
        onMouseMove={handleMouseMove}
      >
        <div className="opacity-0 animate-fade-up delay-100 mb-8">
          <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-neutral-400 uppercase backdrop-blur-md hover:bg-white/10 hover:border-zinc-500/30 transition-all hover:scale-105">
            <Sparkles className="w-3 h-3 animate-spin-slow text-zinc-400" />
            Colchester, United Kingdom
            <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse"></span>
          </span>
        </div>

        <h1 
          className="opacity-0 animate-fade-up delay-200 text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-[0.9] hover:animate-glitch"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <span className="text-gradient-animated">Clive Tsungu</span>
        </h1>

        <p className="opacity-0 animate-fade-up delay-300 text-xl md:text-3xl text-neutral-400 font-light max-w-4xl leading-relaxed mb-12">
          Software Engineer with a strong focus on{" "}
          <span className="text-white font-medium relative inline-block group">
            Fintech/payments
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-zinc-400 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </span>
          . Uniquely experienced in agile startup innovation and enterprise-grade stability.
        </p>

        <div className="opacity-0 animate-fade-up delay-400 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative">About Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative" />
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className="px-8 py-4 bg-transparent text-white rounded-full font-semibold hover:bg-white/5 transition-all duration-300 border border-white/20 hover:border-zinc-500/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group"
          >
            <span className="group-hover:text-zinc-400 transition-colors">Hackathon Wins</span>
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-0 animate-fade-up delay-600">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="px-6 md:px-16 max-w-7xl mx-auto mb-32 relative z-10"
      >
        <div className="border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 leading-tight">
                <span className="hover:text-gradient-animated transition-all">Customer Inspired;</span>
                <br />
                <span className="text-neutral-500 hover:text-zinc-400 transition-colors">Technology Enabled.</span>
              </h2>
              <div className="space-y-6 text-neutral-400 leading-relaxed text-lg">
                <p className="hover:text-neutral-300 transition-colors">
                  I don&apos;t just write code; I take full ownership of the
                  product lifecycle—from protocol-level architecture to
                  pixel-perfect UI.
                </p>
                <p className="hover:text-neutral-300 transition-colors">
                  As a{" "}
                  <strong className="text-white hover:text-zinc-400 transition-colors">
                    forward-deployed engineer
                  </strong>
                  , I thrive at the intersection of design and logic. My
                  background in hackathons (winning 4+) has trained me to ship
                  viable solutions under extreme pressure, while my enterprise
                  experience ensures those solutions scale.
                </p>
                <p className="hover:text-neutral-300 transition-colors">
                  I have an obsessive eye for UI/UX, believing that even the
                  most complex financial settlement layers deserve an interface
                  that feels <span className="text-gradient-animated font-medium">magic</span>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AboutCard
                title="Product & Design Ownership"
                description="I bridge the gap between Figma and Production. If it doesn't look and feel premium, it doesn't ship."
                icon={<Eye className="w-5 h-5" />}
                delay={0}
              />
              <AboutCard
                title="Hackathon DNA"
                description="Rapid prototyping and validation. I build to win, focusing on high-impact features that solve real user problems."
                icon={<Zap className="w-5 h-5" />}
                delay={100}
              />
              <AboutCard
                title="Enterprise Scale"
                description="Experience handling massive transaction volumes and integrating complex payment gateways like Adyen/Apexx."
                icon={<Server className="w-5 h-5" />}
                delay={200}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="px-6 md:px-16 max-w-5xl mx-auto mb-32 relative z-10"
      >
        <h2 className="text-4xl font-bold text-white mb-16 tracking-tight hover:text-gradient-animated transition-all">
          Experience
        </h2>

        <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-16 pb-4">
          <TimelineItem
            role="Software Engineer"
            company="TUI Group"
            date="Sept 2022 – Present"
            description="Engineered critical financial infrastructure processing massive-scale payments. Integrated Adyen and Apexx gateways and built Real-Time Payments using Open Banking."
            stack="C#, AWS Lambda, Serverless"
            delay={0}
          />
          <TimelineItem
            role="CTO & Co-Founder"
            company="Xeno"
            date="Feb 2025 – Dec 2025"
            description="Challenged Visa/Mastercard rails with a proprietary 'Payment Rail 3.0' on Base Mainnet. Achieved sub-5-second finality and eliminated chargebacks."
            delay={100}
          />
          <TimelineItem
            role="CTO & Co-Founder"
            company="Bind"
            date="Sept 2022 – Nov 2024"
            description="Transformed a Hackathon concept into a live product on the App Store with fashion clients. Secured 4th place globally in Solana Hyperdrive (1,200+ entries)."
            delay={200}
          />
        </div>
      </section>

      <section
        id="work"
        className="px-6 md:px-16 max-w-7xl mx-auto mb-32 relative z-10"
      >
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
          <h2 className="text-4xl font-bold text-white tracking-tight hover:text-gradient-animated transition-all">
            Hackathon Wins
          </h2>
          <span className="text-neutral-500 font-mono text-sm hidden md:block animate-pulse">
            2022 — 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          <ProjectCard
            href="https://www.xeno.money"
            title="Xeno"
            description='The world&apos;s first crypto-native "Tap to Pay" iOS app. Engineered a proprietary payment rail parallel to Visa/Mastercard using Apple&apos;s HCE.'
            award="$5k Award"
            awardColor="zinc"
            category="Fintech"
            tags={["Swift", "HCE", "Base Mainnet"]}
            size="large"
            delay={0}
          />

          <ProjectCard
            href="https://apps.apple.com/gb/app/bind/id6499431302"
            title="Bind"
            description="Tamper-proof authenticity for luxury goods using NFC digital twins. 4th Place Global Solana Hyperdrive."
            award="$10k Award"
            awardColor="blue"
            tags={["Solana", "NFC", "AES-256"]}
            size="small"
            delay={100}
          />

          <ProjectCard
            href="https://github.com/Cliv3/ZiltMobileApp/tree/main"
            title="Zilt"
            description="Solving USD shortages in Zimbabwe via Stellar Blockchain. Instant access to USDC stablecoins using mobile numbers."
            award="$3k Award"
            awardColor="indigo"
            tags={["Stellar", "Supabase", "Passkey-Kit"]}
            size="medium"
            isGithub
            delay={200}
          />

          <ProjectCard
            href="https://en.cryptonomist.ch/2024/07/15/plumb-the-new-frontier-of-sustainable-shopping-on-vechain"
            title="Plumb"
            description="Shop-to-Earn sustainability platform rewarding users in crypto based on store sustainability ratings."
            award="$1.5k Award"
            awardColor="teal"
            tags={["VeChain"]}
            size="medium"
            delay={300}
          />
        </div>
      </section>

      <section
        id="contact"
        className="px-6 md:px-16 max-w-7xl mx-auto pb-24 relative z-10"
      >
        <div className="bg-neutral-900/30 rounded-[3rem] p-12 md:p-24 text-center border border-white/5 overflow-hidden relative group hover:border-zinc-500/20 transition-all duration-500 hover-glow">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
          
          <ContactParticles />

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter relative z-10">
            Let&apos;s build the <br />
            <span className="text-gradient-animated">future of payments.</span>
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
            <a
              href="https://docs.google.com/document/d/1LwNPeHMRhHW3k8Be6WlvGFXDGa9kcBOi-6KNgf-indE/edit?tab=t.0"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-all relative overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-zinc-300 to-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <ExternalLink className="w-5 h-5 relative z-10 group-hover:text-white transition-colors" />
              <span className="relative z-10 group-hover:text-white transition-colors">Resume</span>
            </a>
            <a
              href="https://www.linkedin.com/in/clive-tsungu-aa10a81b7/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-black text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group"
            >
              <Linkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors group-hover:animate-bounce-subtle" />
              <span className="group-hover:text-blue-400 transition-colors">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="text-center mt-16 text-neutral-600 text-sm font-mono hover:text-neutral-400 transition-colors">
          &copy; {new Date().getFullYear()} Clive Tsungu • Colchester, United Kingdom
        </div>
      </section>
    </div>
  );
};

const TimelineItem = ({
  role,
  company,
  date,
  description,
  stack,
  delay = 0,
}: {
  role: string;
  company: string;
  date: string;
  description: string;
  stack?: string;
  delay?: number;
}) => (
  <div 
    className="md:pl-12 relative group hover-lift"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-neutral-800 border-2 border-neutral-600 group-hover:border-zinc-500 group-hover:bg-zinc-500 transition-all duration-300 z-10 box-content group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>

    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
      <h3 className="text-2xl font-bold text-white group-hover:text-gradient-animated transition-all">{company}</h3>
      <span className="hidden md:inline text-neutral-600">/</span>
      <span className="text-lg text-neutral-300 font-medium">{role}</span>
      <span className="text-sm text-neutral-500 font-mono md:ml-auto bg-white/5 px-3 py-1 rounded-full group-hover:bg-zinc-500/10 group-hover:text-zinc-400 transition-all">
        {date}
      </span>
    </div>

    <p className="text-neutral-400 leading-relaxed max-w-2xl text-lg mb-3 group-hover:text-neutral-300 transition-colors">
      {description}
    </p>
    {stack && (
      <div className="text-sm font-mono text-neutral-500 pt-2 border-t border-white/5 inline-block mt-2 group-hover:text-zinc-400 transition-colors">
        {stack}
      </div>
    )}
  </div>
);

const AboutCard = ({
  title,
  description,
  icon,
  delay = 0,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
}) => (
  <div 
    className="p-6 bg-neutral-900/30 border border-white/5 rounded-2xl hover:bg-white/5 transition-all duration-300 hover-lift hover:border-zinc-500/30 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3 mb-3">
      {icon && (
        <div className="p-2 bg-zinc-500/10 rounded-lg text-zinc-400 group-hover:bg-zinc-500/20 group-hover:scale-110 transition-all group-hover:animate-bounce-subtle">
          {icon}
        </div>
      )}
      <h3 className="text-white font-bold text-lg group-hover:text-zinc-400 transition-colors">{title}</h3>
    </div>
    <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">{description}</p>
  </div>
);

const ProjectCard = ({
  href,
  title,
  description,
  award,
  awardColor,
  category,
  tags,
  size,
  isGithub = false,
  delay = 0,
}: {
  href: string;
  title: string;
  description: string;
  award: string;
  awardColor: string;
  category?: string;
  tags: string[];
  size: "large" | "medium" | "small";
  isGithub?: boolean;
  delay?: number;
}) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    zinc: { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
    teal: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20" },
  };

  const colors = colorMap[awardColor] || colorMap.zinc;
  
  const sizeClasses = {
    large: "md:col-span-8",
    medium: "md:col-span-6",
    small: "md:col-span-4",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${sizeClasses[size]} group relative bg-neutral-900/50 rounded-3xl p-8 ${size === "large" ? "md:p-12" : ""} border border-white/5 hover:border-${awardColor}-500/30 transition-all duration-500 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between hover-lift`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-all group-hover:scale-110">
        {isGithub ? <Github className="w-5 h-5 group-hover:animate-bounce-subtle" /> : <ExternalLink className={size === "large" ? "w-6 h-6" : "w-5 h-5"} />}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-bold border ${colors.border} group-hover:scale-105 transition-transform`}>
            {award}
          </span>
          {category && (
            <span className="text-neutral-500 text-xs font-mono uppercase">
              {category}
            </span>
          )}
        </div>
        <h3 className={`${size === "large" ? "text-4xl" : "text-3xl"} font-bold text-white mb-${size === "large" ? "4" : "2"} group-hover:text-gradient-animated transition-all`}>
          {title}
        </h3>
        <p className={`text-neutral-400 ${size === "large" ? "text-lg max-w-xl" : "text-sm"} leading-relaxed group-hover:text-neutral-300 transition-colors`}>
          {description}
        </p>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-2 relative z-10">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/5 rounded-md text-xs text-neutral-300 border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};
