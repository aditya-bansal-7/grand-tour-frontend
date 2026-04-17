'use client'

import { Sidebar } from './sidebar'
import { ReactNode } from 'react'

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 p-3 md:p-4 lg:p-5 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
