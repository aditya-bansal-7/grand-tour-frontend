'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Lock, MapPin, Home } from 'lucide-react'

export default function HotelPage() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Hotel Allocation</h1>
          <p className="text-muted-foreground">View your accommodation details</p>
        </div>

        <Card className="p-8 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">This Step is Locked</h2>
              <p className="text-gray-700 mt-1">Complete the previous steps to unlock this section</p>
              <p className="text-sm text-gray-600 mt-2">You will see your hotel allocation details once you complete payment and contract signing.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Home className="w-5 h-5" />
            What to Expect
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span>•</span>
              <span>Accommodation details for your internship duration</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Check-in and check-out dates</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Hotel contact information</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Amenities and facilities information</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Local transportation options</span>
            </li>
          </ul>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Tip:</span> Hotel allocation is typically done after contract signing. Make sure to complete all previous steps on time.
          </p>
        </Card>
      </div>
    </StudentLayout>
  )
}
