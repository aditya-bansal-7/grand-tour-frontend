'use client'

import { StudentSidebar } from './student-sidebar'

interface StudentLayoutProps {
  children: React.ReactNode
  currentStep: string
}

export function StudentLayout({ children, currentStep }: StudentLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar currentStep={currentStep} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
