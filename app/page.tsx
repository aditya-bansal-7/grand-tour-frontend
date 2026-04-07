"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex flex-1 min-h-screen items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />

      {/* Card */}
      <div className="relative z-10 flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-12 py-14 shadow-2xl text-center w-full max-w-md mx-4">
        {/* Logo / Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Grand Tour
          </h1>
          <p className="text-sm text-slate-400">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Google Sign In Button */}
        <button
          id="google-sign-in-btn"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-md transition-all duration-200 hover:bg-slate-50 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {/* Google SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Footer note */}
        <p className="text-xs text-slate-500">
          By signing in, you agree to our{" "}
          <a href="#" className="underline underline-offset-2 hover:text-slate-300 transition-colors">
            Terms
          </a>{" "}
          &amp;{" "}
          <a href="#" className="underline underline-offset-2 hover:text-slate-300 transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
