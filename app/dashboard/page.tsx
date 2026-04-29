'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile, dummyApplicationData } from '@/lib/student-profile'
import { getWorkflowSteps } from '@/lib/student-workflow'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Clock, Zap, ArrowRight, FileText, Calendar, HelpCircle } from 'lucide-react'

export default function StudentDashboard() {
  const steps = getWorkflowSteps(dummyStudentProfile.currentWorkflowStep as any)
  const completedSteps = steps.filter(s => s.completed)
  const currentStep = steps.find(s => s.current)
  const progressPercent = Math.round((completedSteps.length / steps.length) * 100)

  const notifications = [
    { id: 1, type: 'info', message: 'Your interview is scheduled on 20th April at 2:00 PM', icon: Clock },
    { id: 2, type: 'warning', message: 'Sponsor ITR document needs verification', icon: AlertCircle },
    { id: 3, type: 'success', message: 'Your documents have been approved', icon: CheckCircle },
  ]

  const timeline = [
    { date: '10 Apr', event: 'Application Submitted', status: 'completed' },
    { date: '11 Apr', event: 'Application Verified', status: 'completed' },
    { date: '12 Apr', event: 'Documents Uploaded', status: 'completed' },
    { date: '13 Apr', event: 'Interview Scheduled', status: 'completed' },
    { date: '20 Apr', event: 'Interview - Pending', status: 'pending' },
    { date: 'TBD', event: 'Selection Result', status: 'upcoming' },
  ]

  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="space-y-6 max-w-6xl">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border-primary/15 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome back, {dummyStudentProfile.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground max-w-2xl">You&apos;re {progressPercent}% through your internship onboarding journey. Keep up the great work!</p>
            </div>
            <Zap className="w-8 h-8 text-primary flex-shrink-0 hidden md:block" />
          </div>
        </Card>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-md transition-shadow border-success/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Overall Progress</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{progressPercent}%</div>
                <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-accent h-full transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{completedSteps.length} of {steps.length} steps completed</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Current Step</span>
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">{currentStep?.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{currentStep?.description}</p>
              </div>
              <Link href={`/student/${currentStep?.id}`} className="block">
                <Button size="sm" className="w-full">Continue Step</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow border-warning/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Pending Actions</span>
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div className="text-4xl font-bold text-warning">2</div>
              <p className="text-xs text-muted-foreground">Documents & interview prep required</p>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Notifications */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold">Important Notifications</h2>
            {notifications.map((notif) => {
              const Icon = notif.icon
              return (
                <Card key={notif.id} className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{notif.message}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <Card className="p-4 space-y-2">
              <Link href="/student/application" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <FileText className="w-4 h-4" />
                  View Application
                </Button>
              </Link>
              <Link href="/student/documents" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <FileText className="w-4 h-4" />
                  Upload Documents
                </Button>
              </Link>
              <Link href="/student/interview" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Calendar className="w-4 h-4" />
                  Book Interview
                </Button>
              </Link>
              <Link href="/student/faq" className="block">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <HelpCircle className="w-4 h-4" />
                  View FAQ
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <Card className="p-6 md:p-8">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span>Your Journey</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{completedSteps.length} Steps Done</span>
          </h2>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    item.status === 'completed' 
                      ? 'bg-success border-success shadow-sm shadow-success/30' 
                      : item.status === 'pending'
                      ? 'bg-primary border-primary'
                      : 'bg-muted border-muted'
                  }`} />
                  {index < timeline.length - 1 && (
                    <div className={`w-0.5 h-14 my-2 ${
                      item.status === 'completed' ? 'bg-success/30' : 'bg-border'
                    }`} />
                  )}
                </div>
                <div className="pb-4 pt-0.5">
                  <p className={`text-sm font-semibold ${
                    item.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {item.event}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </StudentLayout>
  )
}
