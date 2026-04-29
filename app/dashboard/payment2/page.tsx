'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Lock } from 'lucide-react'

export default function Payment2Page() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Second Installment</h1>
          <p className="text-muted-foreground">Complete your final payment</p>
        </div>

        <Card className="p-8 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">This Step is Locked</h2>
              <p className="text-gray-700 mt-1">Complete previous payments and milestones to unlock this section</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            The second installment payment details will be available after successful completion of the first payment and other milestones. You will receive notification when this step is unlocked.
          </p>
        </Card>
      </div>
    </StudentLayout>
  )
}
