'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile, dummyApplicationData } from '@/lib/student-profile'
import { CheckCircle } from 'lucide-react'

export default function ApplicationPage() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Application Form</h1>
          <p className="text-muted-foreground">Your submitted application details</p>
          <div className="flex items-center gap-2 text-green-600 mt-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Application Approved</span>
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.fullName}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Date of Birth</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.dateOfBirth}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Place of Birth</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.placeOfBirth}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">WhatsApp</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.whatsapp}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.email}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">City</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.city}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Educational Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">College Name</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.collegeName}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">University</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.universityName}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Course</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.course}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Current Year</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.currentYear}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Department</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.department}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">CGPA</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.cgpa}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">TPO Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">TPO Name</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.tpoName}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">TPO Email</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.tpoEmail}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Internship Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Start Date</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.internshipStartDate}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">End Date</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.internshipEndDate}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Duration</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.duration}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Submitted On</label>
              <p className="text-foreground font-medium mt-2">{dummyApplicationData.submittedAt}</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button className="gap-2">
            ✓ Approve Application
          </Button>
          <Button variant="outline">Download PDF</Button>
        </div>
      </div>
    </StudentLayout>
  )
}
