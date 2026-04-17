'use client'

import { Card } from '@/components/ui/card'
import { dummyCandidates } from '@/lib/candidate-data'
import { dummyInterviews } from '@/lib/interview-data'
import { dummyActivityLogs } from '@/lib/activity-data'
import { TrendingUp, Users, Calendar, Clock } from 'lucide-react'

export function CRMDashboard() {
  const pendingCandidates = dummyCandidates.filter((c) => c.status === 'pending').length
  const approvedCandidates = dummyCandidates.filter((c) => c.status === 'approved').length
  const pendingInterviews = dummyInterviews.filter((i) => i.status === 'pending').length
  const recentActivities = dummyActivityLogs.slice(0, 5)

  const candidatesByStep = dummyCandidates.reduce(
    (acc, candidate) => {
      const step = candidate.currentStep
      acc[step] = (acc[step] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="mt-4 md:mt-5 space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Total Candidates</p>
              <p className="text-2xl font-bold text-foreground">{dummyCandidates.length}</p>
            </div>
            <Users className="w-10 h-10 text-primary/20" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Pending Action</p>
              <p className="text-2xl font-bold text-foreground">{pendingCandidates}</p>
              <p className="text-xs text-orange-600 mt-1">Awaiting review</p>
            </div>
            <Clock className="w-10 h-10 text-orange-300" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Scheduled Interviews</p>
              <p className="text-2xl font-bold text-foreground">{pendingInterviews}</p>
              <p className="text-xs text-blue-600 mt-1">This month</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-300" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Approved</p>
              <p className="text-2xl font-bold text-foreground">{approvedCandidates}</p>
              <p className="text-xs text-green-600 mt-1">Ready to onboard</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-300" />
          </div>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Candidates by Step */}
        <Card className="p-4 lg:col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Candidates by Step</h3>
          <div className="space-y-3">
            {Object.entries(candidatesByStep)
              .sort(([, a], [, b]) => b - a)
              .map(([step, count]) => (
                <div key={step}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-foreground">{step}</span>
                    <span className="text-xs font-semibold text-primary">{count}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${(count / dummyCandidates.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="text-xs border-b border-border pb-2 last:border-0">
                <p className="text-foreground font-medium truncate">{activity.description}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {activity.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Pipeline Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground mb-1">Conversion Rate</p>
            <p className="text-lg font-bold text-foreground">
              {Math.round((approvedCandidates / dummyCandidates.length) * 100)}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Avg Days in Pipeline</p>
            <p className="text-lg font-bold text-foreground">14</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Pending Documents</p>
            <p className="text-lg font-bold text-foreground">3</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">This Month Approved</p>
            <p className="text-lg font-bold text-foreground">{approvedCandidates}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
