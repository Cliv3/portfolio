"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Smartphone,
  ExternalLink,
  ArrowRight,
  Terminal,
  Database,
  Shield,
  Globe,
  Wifi,
  Battery,
  Search,
  Command,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Lock,
  Share,
  LayoutGrid,
  Plus,
  Server,
  Layers,
  Cpu,
  Code,
  User,
  Award,
  Eye,
  Zap,
  FileText,
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
    .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
  `}</style>
);

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

      <div className="absolute top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 z-50 text-xs font-medium border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-lg pb-1 text-white/90"></div>
          <span className="font-bold cursor-default text-white">Finder</span>
          {["File", "Edit", "View", "Go", "Window", "Help"].map((item) => (
            <span
              key={item}
              className="hidden md:inline cursor-default opacity-90 hover:opacity-100"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 cursor-default">
          <span className="hidden md:inline opacity-90">
            <Battery className="w-3.5 h-3.5 inline mr-1" /> 100%
          </span>
          <span className="hidden md:inline opacity-90">
            <Wifi className="w-3.5 h-3.5 inline" />
          </span>
          <span>
            <Search className="w-3.5 h-3.5 inline" />
          </span>
          <span>
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
    <div className="w-full h-full max-w-[1600px] bg-[#050505] rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden relative group">
      <div className="h-12 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 shrink-0 z-40 gap-4 transition-colors duration-300">
        <div className="flex items-center gap-2 w-16">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-110 cursor-pointer shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] hover:brightness-110 cursor-pointer shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] hover:brightness-110 cursor-pointer shadow-sm"></div>
        </div>

        <div className="flex items-center gap-4 text-neutral-500">
          <LayoutGrid className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
            <ChevronRight className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-auto">
          <div className="h-8 bg-[#0a0a0a] rounded-lg flex items-center justify-center relative group border border-white/5 hover:border-white/10 hover:bg-[#151515] transition-all cursor-text shadow-inner">
            <Lock className="w-3 h-3 text-neutral-500 absolute left-3 group-hover:text-emerald-500 transition-colors" />
            <div className="text-xs text-neutral-400 font-medium group-hover:text-white flex items-center gap-1 transition-colors">
              <span className="text-neutral-600">https://</span>clivetsungu.dev
            </div>
            <RotateCw className="w-3 h-3 text-neutral-500 absolute right-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:rotate-180 duration-500" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-neutral-500 w-16 justify-end">
          <Share className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
          <Plus className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
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
          className="fixed top-[48px] left-0 h-[1px] bg-gradient-to-r from-blue-500 to-emerald-500 z-50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
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
  return (
    <div className="min-h-full bg-[#050505] text-neutral-200 font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-16 max-w-7xl mx-auto text-center relative z-10">
        <div className="opacity-0 animate-fade-up delay-100 mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-neutral-400 uppercase backdrop-blur-md">
            Colchester, United Kingdom
          </span>
        </div>

        <h1 className="opacity-0 animate-fade-up delay-200 text-6xl md:text-9xl font-bold text-white tracking-tighter mb-6 leading-[0.9]">
          Clive Tsungu
        </h1>

        <p className="opacity-0 animate-fade-up delay-300 text-xl md:text-3xl text-neutral-400 font-light max-w-4xl leading-relaxed mb-12">
          Software Engineer with a strong focus on Fintech/payments. Uniquely
          experienced in agile startup innovation and enterprise-grade
          stability.
        </p>

        <div className="opacity-0 animate-fade-up delay-400 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-all duration-300 transform hover:scale-105"
          >
            About Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className="px-8 py-4 bg-transparent text-white rounded-full font-semibold hover:bg-white/5 transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            Hackathon Wins
          </button>
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
                Customer Inspired;
                <br />
                <span className="text-neutral-500">Technology Enabled.</span>
              </h2>
              <div className="space-y-6 text-neutral-400 leading-relaxed text-lg">
                <p>
                  I don&apos;t just write code; I take full ownership of the
                  product lifecycle—from protocol-level architecture to
                  pixel-perfect UI.
                </p>
                <p>
                  As a{" "}
                  <strong className="text-white">
                    forward-deployed engineer
                  </strong>
                  , I thrive at the intersection of design and logic. My
                  background in hackathons (winning 4+) has trained me to ship
                  viable solutions under extreme pressure, while my enterprise
                  experience ensures those solutions scale.
                </p>
                <p>
                  I have an obsessive eye for UI/UX, believing that even the
                  most complex financial settlement layers deserve an interface
                  that feels magic.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AboutCard
                title="Product & Design Ownership"
                description="I bridge the gap between Figma and Production. If it doesn't look and feel premium, it doesn't ship."
              />
              <AboutCard
                title="Hackathon DNA"
                description="Rapid prototyping and validation. I build to win, focusing on high-impact features that solve real user problems."
              />
              <AboutCard
                title="Enterprise Scale"
                description="Experience handling massive transaction volumes and integrating complex payment gateways like Adyen/Apexx."
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="px-6 md:px-16 max-w-5xl mx-auto mb-32 relative z-10"
      >
        <h2 className="text-4xl font-bold text-white mb-16 tracking-tight">
          Experience
        </h2>

        <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-16 pb-4">
          <TimelineItem
            role="Software Engineer"
            company="TUI Group"
            date="Sept 2022 – Present"
            description="Engineered critical financial infrastructure processing massive-scale payments. Integrated Adyen and Apexx gateways and built Real-Time Payments using Open Banking."
            stack="C#, AWS Lambda, Serverless"
          />
          <TimelineItem
            role="CTO & Co-Founder"
            company="Xeno"
            date="Feb 2025 – Dec 2025"
            description="Challenged Visa/Mastercard rails with a proprietary 'Payment Rail 3.0' on Base Mainnet. Achieved sub-5-second finality and eliminated chargebacks."
          />
          <TimelineItem
            role="CTO & Co-Founder"
            company="Bind"
            date="Sept 2022 – Nov 2024"
            description="Transformed a Hackathon concept into a live product on the App Store with fashion clients. Secured 4th place globally in Solana Hyperdrive (1,200+ entries)."
          />
        </div>
      </section>

      <section
        id="work"
        className="px-6 md:px-16 max-w-7xl mx-auto mb-32 relative z-10"
      >
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Hackathon Wins
          </h2>
          <span className="text-neutral-500 font-mono text-sm hidden md:block">
            2022 — 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          <a
            href="https://www.xeno.money"
            target="_blank"
            rel="noreferrer"
            className="md:col-span-8 group relative bg-neutral-900/50 rounded-3xl p-8 md:p-12 border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  $5k Award
                </span>
                <span className="text-neutral-500 text-xs font-mono uppercase">
                  Fintech
                </span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-emerald-100 transition-colors">
                Xeno
              </h3>
              <p className="text-neutral-400 text-lg max-w-xl leading-relaxed">
                The world&apos;s first crypto-native &quot;Tap to Pay&quot; iOS
                app. Engineered a proprietary payment rail parallel to
                Visa/Mastercard using Apple&apos;s HCE.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Swift", "HCE", "Base Mainnet"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 rounded-md text-xs text-neutral-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>

          <a
            href="https://apps.apple.com/gb/app/bind/id6499431302"
            target="_blank"
            rel="noreferrer"
            className="md:col-span-4 group relative bg-neutral-900/50 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                  $10k Award
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Bind</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Tamper-proof authenticity for luxury goods using NFC digital
                twins. 4th Place Global Solana Hyperdrive.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Solana", "NFC", "AES-256"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 rounded-md text-xs text-neutral-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>

          <a
            href="https://github.com/Cliv3/ZiltMobileApp/tree/main"
            target="_blank"
            rel="noreferrer"
            className="md:col-span-6 group relative bg-neutral-900/50 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                  $3k Award
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Zilt</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Solving USD shortages in Zimbabwe via Stellar Blockchain.
                Instant access to USDC stablecoins using mobile numbers.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Stellar", "Supabase", "Passkey-Kit"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 rounded-md text-xs text-neutral-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>

          <a
            href="https://en.cryptonomist.ch/2024/07/15/plumb-the-new-frontier-of-sustainable-shopping-on-vechain"
            target="_blank"
            rel="noreferrer"
            className="md:col-span-6 group relative bg-neutral-900/50 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 hover:bg-neutral-900 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20">
                  $1.5k Award
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Plumb</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Shop-to-Earn sustainability platform rewarding users in crypto
                based on store sustainability ratings.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-md text-xs text-neutral-300 border border-white/5">
                VeChain
              </span>
            </div>
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="px-6 md:px-16 max-w-7xl mx-auto pb-24 relative z-10"
      >
        <div className="bg-neutral-900/30 rounded-[3rem] p-12 md:p-24 text-center border border-white/5 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
            Let&apos;s build the <br />
            future of payments.
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
            <a
              href="https://docs.google.com/document/d/1LwNPeHMRhHW3k8Be6WlvGFXDGa9kcBOi-6KNgf-indE/edit?tab=t.0"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/clive-tsungu-aa10a81b7/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-black text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
        <div className="text-center mt-16 text-neutral-600 text-sm font-mono">
          &copy; {new Date().getFullYear()} Clive Tsungu • Colchester, United
          Kingdom
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
}: {
  role: string;
  company: string;
  date: string;
  description: string;
  stack?: string;
}) => (
  <div className="md:pl-12 relative group">
    <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-neutral-800 border-2 border-neutral-600 group-hover:border-white group-hover:bg-white transition-all duration-300 z-10 box-content"></div>

    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
      <h3 className="text-2xl font-bold text-white">{company}</h3>
      <span className="hidden md:inline text-neutral-600">/</span>
      <span className="text-lg text-neutral-300 font-medium">{role}</span>
      <span className="text-sm text-neutral-500 font-mono md:ml-auto bg-white/5 px-3 py-1 rounded-full">
        {date}
      </span>
    </div>

    <p className="text-neutral-400 leading-relaxed max-w-2xl text-lg mb-3">
      {description}
    </p>
    {stack && (
      <div className="text-sm font-mono text-neutral-500 pt-2 border-t border-white/5 inline-block mt-2">
        {stack}
      </div>
    )}
  </div>
);

const AboutCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-neutral-900/30 border border-white/5 rounded-2xl hover:bg-white/5 transition-all duration-300">
    <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
    <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
  </div>
);
