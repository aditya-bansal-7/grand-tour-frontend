'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Calendar, Clock, MapPin, Video, CheckCircle } from 'lucide-react'

export default function InterviewPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const upcomingInterview = {
    date: '20 April 2024',
    time: '2:00 PM - 2:30 PM',
    duration: '30 mins',
    type: 'Video Interview',
    interviewers: ['Ms. Sarah Johnson', 'Mr. Rajesh Kumar'],
    link: 'https://zoom.us/meeting/sample',
  }

  const availableSlots = [
    { date: '18 April', times: ['10:00 AM', '11:00 AM', '2:00 PM', '3:30 PM'] },
    { date: '19 April', times: ['10:30 AM', '1:00 PM', '3:00 PM'] },
    { date: '22 April', times: ['11:00 AM', '2:30 PM', '4:00 PM'] },
    { date: '23 April', times: ['9:30 AM', '10:30 AM', '3:00 PM'] },
  ]

  const faqs = [
    { q: 'What should I prepare?', a: 'Review your CV, the company profile, and common technical questions.' },
    { q: 'How should I dress?', a: 'Business casual or formal attire is recommended.' },
    { q: 'What if I miss the interview?', a: 'Contact us immediately to reschedule.' },
    { q: 'Is it recorded?', a: 'Interviews may be recorded. You will be informed before the call.' },
  ]

  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Interview Booking</h1>
          <p className="text-muted-foreground">Schedule your interview with our team</p>
        </div>

        {/* Upcoming Interview */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <h2 className="text-lg font-semibold text-foreground">Your Scheduled Interview</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{upcomingInterview.date}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{upcomingInterview.time}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{upcomingInterview.type}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Online via Zoom</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Interviewers:</p>
                <div className="flex flex-wrap gap-2">
                  {upcomingInterview.interviewers.map((name) => (
                    <span key={name} className="px-3 py-1 bg-white rounded-full text-sm text-foreground">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button className="gap-2">
              <Video className="w-4 h-4" />
              Join Interview
            </Button>
          </div>
        </Card>

        {/* Interview Tips */}
        <Card className="p-6 border-l-4 border-l-green-500">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Interview Preparation Tips
          </h2>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>Test your internet connection 10 minutes before the interview</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>Ensure proper lighting and a clean background</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>Have a notepad and pen ready</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>Close unnecessary applications and tabs</span>
            </li>
          </ul>
        </Card>

        {/* Reschedule Option */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Need to Reschedule?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Select an alternative time slot from available options
          </p>
          <div className="space-y-4">
            {availableSlots.map((slotGroup) => (
              <div key={slotGroup.date} className="space-y-2">
                <p className="text-sm font-semibold text-foreground">{slotGroup.date}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {slotGroup.times.map((time) => (
                    <Button
                      key={time}
                      variant={selectedSlot === time ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSlot(time)}
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            <Button disabled={!selectedSlot}>Confirm Reschedule</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-3 bg-secondary rounded-lg">
                <p className="font-semibold text-foreground mb-1">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </StudentLayout>
  )
}
