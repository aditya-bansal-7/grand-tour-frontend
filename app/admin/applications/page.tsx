'use client'

import { DashboardLayout } from '@/components/dashboard/layout-wrapper'
import { Header } from '@/components/dashboard/header'
import { CandidatesTable } from '@/components/candidates/candidates-table'

export default function ApplicationsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <Header 
          title="Applications" 
          description="Manage new internship applications" 
        />
        <CandidatesTable initialStatus="pending" />
      </div>
    </DashboardLayout>
  )
}
