'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Lock } from 'lucide-react'

export default function FinalDocsPage() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Final Documents</h1>
          <p className="text-muted-foreground">Submit final required documents</p>
        </div>

        <Card className="p-8 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">This Step is Locked</h2>
              <p className="text-gray-700 mt-1">Final documents submission will be enabled in later stages</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            You will be asked to submit various final documents towards the end of your onboarding process.
          </p>
        </Card>
      </div>
    </StudentLayout>
  )
}
