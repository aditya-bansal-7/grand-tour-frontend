'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Clock, CheckCircle } from 'lucide-react'

export default function SelectionPage() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Selection Status</h1>
          <p className="text-muted-foreground">Check your interview results and selection status</p>
        </div>

        <Card className="p-8 border-2 border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-8 h-8 text-yellow-700" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-yellow-900">Selection Pending</h2>
              <p className="text-yellow-800 mt-1">Your interview was completed on 20 April. Results will be announced within 3-5 business days.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-yellow-700">
                <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse" />
                <span>Awaiting decision from our selection committee</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-3">Interview Feedback</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Date & Time</p>
                <p className="font-medium text-foreground">20 April 2024, 2:00 PM</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">32 minutes</p>
              </div>
              <div>
                <p className="text-muted-foreground">Panel</p>
                <p className="font-medium text-foreground">Sarah Johnson, Rajesh Kumar</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="text-green-600">✓</span>
                <div>
                  <p className="text-muted-foreground">Interview Conducted</p>
                  <p className="font-medium">20 Apr 2024</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-gray-300">→</span>
                <div>
                  <p className="text-muted-foreground">Decision Expected</p>
                  <p className="font-medium">24 Apr 2024</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">What Happens Next?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="font-bold text-primary">1</span>
              <div>
                <p className="font-medium text-foreground">Interview Review</p>
                <p className="text-muted-foreground">Our team evaluates all interview responses</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary">2</span>
              <div>
                <p className="font-medium text-foreground">Final Decision</p>
                <p className="text-muted-foreground">Selection committee makes final decision</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary">3</span>
              <div>
                <p className="font-medium text-foreground">Announcement</p>
                <p className="text-muted-foreground">Results shared via email and dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-primary">4</span>
              <div>
                <p className="font-medium text-foreground">Onboarding</p>
                <p className="text-muted-foreground">Proceed to next steps if selected</p>
              </div>
            </div>
          </div>
        </Card>

        <Button className="w-full gap-2" variant="outline" disabled>
          <Clock className="w-4 h-4" />
          Awaiting Results...
        </Button>
      </div>
    </StudentLayout>
  )
}
