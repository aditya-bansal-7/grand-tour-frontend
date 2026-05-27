"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, Terminal, ShieldCheck, Megaphone, Settings, HelpCircle, GraduationCap, Globe2 } from "lucide-react";
import { toast } from "sonner";

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active 
          ? "bg-[#1C1C1C] text-[#B7F035]" 
          : "text-gray-400 hover:bg-[#1C1C1C]/50 hover:text-white"
      }`}
    >
      <div className={active ? "text-[#B7F035]" : "text-gray-400"}>
        {icon}
      </div>
      <span className={`text-[11px] font-bold tracking-wider uppercase ${active ? "text-[#B7F035]" : "text-gray-400"}`}>
        {label}
      </span>
    </button>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password || "dummy-password", // fallback if using OTP only backend
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-10 h-10 text-[#8B48F6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-sans">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#0A0A0A] flex flex-col h-screen py-8 px-4 relative z-20 shadow-2xl">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-lg bg-[#C6F16D] flex items-center justify-center text-black shadow-[0_0_15px_rgba(198,241,109,0.3)]">
            <Sparkles className="w-5 h-5" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide leading-tight text-white">ACADEMIC<br/>CURATOR</span>
            <span className="text-[9px] text-gray-500 font-bold tracking-widest mt-1">EDITORIAL JOURNEY</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <NavItem icon={<Sparkles className="w-4 h-4" />} label="JOURNEY" active />
          <NavItem icon={<Terminal className="w-4 h-4" />} label="COMMAND CENTER" />
          <NavItem icon={<ShieldCheck className="w-4 h-4" />} label="VERIFICATION" />
          <NavItem icon={<Megaphone className="w-4 h-4" />} label="MARKETING" />
        </nav>

        <div className="flex flex-col gap-1 mt-auto">
          <NavItem icon={<Settings className="w-4 h-4" />} label="SETTINGS" />
          <NavItem icon={<HelpCircle className="w-4 h-4" />} label="SUPPORT" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Background Aesthetics */}
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-[#E1F0C4]/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-[#F4E6E6]/60 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />
        
        <div className="w-full max-w-[1000px] px-8 flex justify-between items-center gap-12 relative z-10">
          
          {/* Left Text Column */}
          <div className="max-w-[460px]">
            <div className="bg-[#EDDCFF] text-[#8B48F6] text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full w-fit mb-6 uppercase shadow-sm">
              Student Portal V2.0
            </div>
            
            <h1 className="text-[64px] leading-[1.05] font-semibold text-[#1A1A1A] tracking-tight mb-6">
              Begin Your<br/>
              <span className="text-[#4D6B19] font-bold">Editorial</span><br/>
              <span className="font-bold">Journey.</span>
            </h1>
            
            <p className="text-[#666666] text-base mb-10 leading-relaxed pr-8">
              Access your curated internship paths and academic milestones through our secure student gateway.
            </p>
            
            <div className="flex gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 border border-gray-100">
                <GraduationCap className="w-6 h-6 text-[#4D6B19] mb-3" />
                <div className="text-2xl font-bold text-[#1A1A1A] mb-1">1,200+</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">GLOBAL PARTNERS</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 border border-gray-100">
                <Globe2 className="w-6 h-6 text-[#8B48F6] mb-3" />
                <div className="text-2xl font-bold text-[#1A1A1A] mb-1">45</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">COUNTRIES REACHED</div>
              </div>
            </div>
          </div>

          {/* Right Login Box */}
          <div className="w-[400px] shrink-0">
            <div className="bg-white rounded-[2rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-[22px] font-semibold text-[#1A1A1A] mb-2">Welcome back</h2>
                <p className="text-[#666666] text-[13px]">Select your preferred login method</p>
              </div>
              
              <button 
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 rounded-[14px] border border-gray-200 bg-white px-4 py-3.5 text-[14px] font-semibold text-[#333333] hover:bg-gray-50 hover:border-gray-300 transition-all mb-8 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
              
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-bold tracking-widest text-[#B3B3B3]">
                  <span className="bg-white px-4">OR LOGIN WITH EMAIL</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#666666] tracking-widest ml-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    className="w-full bg-[#F5F5F5] border border-transparent rounded-[14px] py-3.5 px-4 text-[14px] text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#C6F16D]/60 focus:bg-white focus:border-[#C6F16D]/30 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#666666] tracking-widest ml-1">PASSWORD (OPTIONAL)</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#F5F5F5] border border-transparent rounded-[14px] py-3.5 px-4 text-[14px] text-[#1A1A1A] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#C6F16D]/60 focus:bg-white focus:border-[#C6F16D]/30 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C6F16D] hover:bg-[#b5e359] text-[#1A1A1A] font-semibold py-3.5 rounded-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 mt-2 shadow-sm"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Send Login Code"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center space-y-1">
                <p className="text-[12px] text-[#808080]">
                  We'll send a 6-digit verification code to your<br/>academic email.
                </p>
                <button className="text-[12px] text-[#8B48F6] hover:text-[#7633e0] transition-colors font-medium">
                  Trouble logging in?
                </button>
              </div>
              
              <div className="mt-10 flex justify-between items-center text-[9px] font-bold tracking-widest text-[#B3B3B3] uppercase">
                <span>© 2024 LUMINA ACADEMY</span>
                <div className="flex gap-4">
                  <button className="hover:text-gray-600 transition-colors">PRIVACY</button>
                  <button className="hover:text-gray-600 transition-colors">TERMS</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Faint map overlay on bottom right could be added but skipping to save complexity */}
      </div>
    </div>
  );
}

