'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Mail, Phone, MapPin, GraduationCap, Calendar } from 'lucide-react'

export default function ProfilePage() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>

        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-6 flex-1">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-4xl font-bold text-white">AK</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{dummyStudentProfile.name}</h2>
                <p className="text-muted-foreground mt-1">{dummyStudentProfile.department} • {dummyStudentProfile.currentYear}</p>
                <p className="text-sm text-muted-foreground mt-2">{dummyStudentProfile.collegeName}</p>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                <a href={`mailto:${dummyStudentProfile.email}`} className="text-foreground hover:underline truncate">
                  {dummyStudentProfile.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase">WhatsApp</p>
                <a href={`https://wa.me/${dummyStudentProfile.whatsapp.replace(/\D/g, '')}`} className="text-foreground hover:underline">
                  {dummyStudentProfile.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Address</p>
                <p className="text-foreground">{dummyStudentProfile.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Date of Birth</p>
                <p className="text-foreground">{dummyStudentProfile.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Educational Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Educational Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">College Name</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.collegeName}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Department</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.department}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Course</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.course}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Current Year</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.currentYear}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Duration</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.duration}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">TPO Name</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.tpoName}</p>
            </div>
          </div>
        </Card>

        {/* Internship Details */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Internship Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Start Date</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.internshipStartDate}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">End Date</label>
              <p className="text-foreground font-medium mt-2">{dummyStudentProfile.internshipEndDate}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">ID</label>
              <p className="text-foreground font-medium mt-2 font-mono">{dummyStudentProfile.id}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
              <p className="text-foreground font-medium mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Active</span>
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button className="gap-2">Save Changes</Button>
          <Button variant="outline">Download Profile</Button>
        </div>
      </div>
    </StudentLayout>
  )
}
