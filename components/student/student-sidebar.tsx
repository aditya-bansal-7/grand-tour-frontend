'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  Sparkles,
  Calendar,
  ShieldCheck,
  Banknote,
  Settings,
  HelpCircle,
  Plus,
  LogOut,
  LayoutDashboard,
  FileText,
  Plane,
  Building2,
  Stamp,
  Briefcase,
  ClipboardCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Sparkles, label: 'Application', href: '/dashboard/application' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: Calendar, label: 'Interview Hub', href: '/dashboard/interview' },
  { icon: ShieldCheck, label: 'Offers & Selection', href: '/dashboard/selection' },
  { icon: Banknote, label: 'Financial Center', href: '/dashboard/payment1', badge: 'New' },
  { icon: ClipboardCheck, label: 'Contract', href: '/dashboard/contract' },
  { icon: Stamp, label: 'Visa', href: '/dashboard/visa' },
  { icon: Briefcase, label: 'Work Permit', href: '/dashboard/workpermit' },
  { icon: Plane, label: 'Travel', href: '/dashboard/travel' },
  { icon: Building2, label: 'Hotel', href: '/dashboard/hotel' },
]

export function StudentSidebar({ currentStep }: { currentStep?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className="fixed top-0 left-0 w-56 h-screen flex flex-col lg:block"
      style={{ backgroundColor: '#141414', borderRight: '1px solid #222' }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <Link href="/" className="block">
          <p
            className="text-xl font-bold tracking-tight leading-none"
            style={{ color: '#CCFF00', fontFamily: 'Gilroy, sans-serif' }}
          >
            Grand Tour
          </p>
          <p
            className="text-[10px] tracking-widest uppercase mt-0.5"
            style={{ color: '#555' }}
          >
            Command Center
          </p>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200',
                  isActive
                    ? 'text-black'
                    : 'hover:bg-white/5'
                )}
                style={
                  isActive
                    ? { backgroundColor: '#CCFF00', color: '#111' }
                    : { color: '#777' }
                }
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && !isActive && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: '#CCFF00', color: '#111' }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="px-3 pb-6 space-y-3">
        {/* New Entry CTA */}
        <Link
          href="/dashboard/application"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: '#CCFF00', color: '#111' }}
        >
          <Plus className="w-3.5 h-3.5" />
          New Entry
        </Link>

        {/* Settings & Support */}
        <div className="space-y-0.5">
          <Link
            href="/dashboard/profile"
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200',
              pathname === '/dashboard/profile' ? 'text-black' : 'hover:bg-white/5'
            )}
            style={
              pathname === '/dashboard/profile'
                ? { backgroundColor: '#CCFF00', color: '#111' }
                : { color: '#555' }
            }
          >
            <Settings className="w-3.5 h-3.5 shrink-0" />
            <span>Settings</span>
          </Link>

          <Link
            href="/dashboard/faq"
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200',
              pathname === '/dashboard/faq' ? 'text-black' : 'hover:bg-white/5'
            )}
            style={
              pathname === '/dashboard/faq'
                ? { backgroundColor: '#CCFF00', color: '#111' }
                : { color: '#555' }
            }
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Support</span>
          </Link>

          {/* Sign out */}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 hover:bg-white/5 text-left"
            style={{ color: '#555' }}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
