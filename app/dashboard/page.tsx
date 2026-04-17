"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import UploadPopup from "@/components/UploadPopup";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-1 min-h-screen items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      {/* Top Nav */}
      <header className="flex items-center justify-between border-b border-white/10 bg-slate-900/60 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
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
          <span className="font-semibold text-sm tracking-tight">Grand Tour</span>
        </div>

        {/* Sign Out */}
        <button
          id="sign-out-btn"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />

        {/* Welcome card */}
        <div className="relative z-10 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-12 shadow-2xl text-center w-full max-w-md">
          {/* Avatar */}
          <div className="relative">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User avatar"}
                width={80}
                height={80}
                className="rounded-full ring-4 ring-indigo-500/40 shadow-lg"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 ring-4 ring-indigo-500/40 text-2xl font-bold">
                {initials}
              </div>
            )}
            {/* Online dot */}
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>

          {/* User info */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {user?.name ?? "Welcome!"}
            </h1>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Stats row */}
          <div className="grid grid-cols-3 w-full gap-4">
            {[
              { label: "Trips", value: "0" },
              { label: "Reviews", value: "0" },
              { label: "Photos", value: "0" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-white">{value}</span>
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-3 text-sm font-medium text-indigo-400 hover:bg-indigo-500/20 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Upload New Media
          </button>
        </div>

        {/* Upload Popup */}
        <UploadPopup 
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          token={session.backendToken as string}
          onUploadComplete={(data) => {
            console.log("Upload successful:", data);
          }}
        />

        {/* Info pills */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Session Active
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Authenticated via Google
          </span>
        </div>
      </main>
    </div>
  );
}
