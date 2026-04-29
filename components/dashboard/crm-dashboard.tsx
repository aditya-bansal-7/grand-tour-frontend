"use client"
import { useState, useEffect } from 'react'
import { analyticsService, activityService, workflowService } from '@/lib/services/api.service'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Loader2, TrendingUp, Users, Calendar, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function CRMDashboard() {
  const [data, setData] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [workflow, setWorkflow] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, actData, wfData] = await Promise.all([
        analyticsService.getDashboard(),
        activityService.getRecent(),
        workflowService.get()
      ])
      setData(statsData)
      setActivities(actData)
      setWorkflow(wfData)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading dashboard metrics...</p>
      </div>
    )
  }

  const { stats } = data

  // Format activity description
  const formatActivity = (activity: any) => {
    const name = activity.application?.user 
      ? `${activity.application.user.firstName} ${activity.application.user.lastName}`
      : 'System'
    return activity.description.replace(/Application/g, name)
  }

  return (
    <div className="mt-4 md:mt-5 space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Total Candidates</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalCandidates}</p>
              <div className="flex items-center gap-1 text-[10px] text-green-600 mt-1 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                <span>8% growth</span>
              </div>
            </div>
            <Users className="w-10 h-10 text-primary/20" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Pending Action</p>
              <p className="text-2xl font-bold text-foreground">{stats.pendingApplications}</p>
              <p className="text-xs text-orange-600 mt-1 font-medium italic">Awaiting review</p>
            </div>
            <Clock className="w-10 h-10 text-orange-300" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-[10px] text-green-600 mt-1 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                <span>Active payments</span>
              </div>
            </div>
            <TrendingUp className="w-10 h-10 text-green-300" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Approved</p>
              <p className="text-2xl font-bold text-foreground">{stats.acceptedApplications}</p>
              <p className="text-xs text-blue-600 mt-1 font-medium uppercase tracking-tighter">Ready to onboard</p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-300" />
          </div>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Recent Activity */}
        <Card className="p-4 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">Live</span>
          </div>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-8">No recent activity</p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-[1px] before:bg-border last:before:hidden">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    activity.type.includes('STATUS') ? 'bg-blue-100 text-blue-600' : 
                    activity.type.includes('STEP') ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-foreground font-medium leading-tight">
                      {formatActivity(activity)}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {new Date(activity.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Analytics Breakdown */}
        <Card className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Pipeline Health</h3>
            <select className="text-[10px] bg-secondary border-0 rounded p-1">
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-secondary/30 rounded-xl border border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Conversion</p>
              <p className="text-xl font-bold text-foreground">{stats.conversionRate}%</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-xl border border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Avg. Days</p>
              <p className="text-xl font-bold text-foreground">12</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-xl border border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Pending Docs</p>
              <p className="text-xl font-bold text-foreground">5</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-xl border border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Active Trials</p>
              <p className="text-xl font-bold text-foreground">3</p>
            </div>
          </div>

          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Recent Applications</h4>
          <div className="space-y-2">
            {data.recentApplications.map((app: any) => (
              <div key={app.id} className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {app.user.firstName[0]}{app.user.lastName[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{app.user.firstName} {app.user.lastName}</p>
                    <p className="text-[10px] text-muted-foreground">{app.program || 'Internship'}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  app.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                  app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}
