'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const conversionFunnelData = [
  { name: 'Applied', value: 48, percentage: 100 },
  { name: 'Initial Assessment', value: 36, percentage: 75 },
  { name: 'Technical', value: 24, percentage: 50 },
  { name: 'Final Round', value: 12, percentage: 25 },
  { name: 'Offer', value: 8, percentage: 17 },
]

const candidateStatusData = [
  { name: 'Pending', value: 15, fill: '#fbbf24' },
  { name: 'Approved', value: 8, fill: '#10b981' },
  { name: 'Rejected', value: 5, fill: '#ef4444' },
]

const timeToHireData = [
  { step: 'Initial Assessment', days: 3 },
  { step: 'Technical', days: 5 },
  { step: 'Final Round', days: 4 },
  { step: 'Offer', days: 2 },
]

const pipelineData = [
  { month: 'Jan', applications: 24, interviews: 18, offers: 4 },
  { month: 'Feb', applications: 32, interviews: 22, offers: 6 },
  { month: 'Mar', applications: 28, interviews: 19, offers: 5 },
  { month: 'Apr', applications: 35, interviews: 25, offers: 8 },
]

export function ReportsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Candidates</p>
          <p className="text-3xl font-bold text-foreground">28</p>
          <p className="text-xs text-green-600 mt-2">+12% from last month</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg Time to Hire</p>
          <p className="text-3xl font-bold text-foreground">14</p>
          <p className="text-xs text-muted-foreground mt-2">days</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-foreground">17%</p>
          <p className="text-xs text-red-600 mt-2">-2% from last month</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Pending Review</p>
          <p className="text-3xl font-bold text-foreground">9</p>
          <p className="text-xs text-orange-600 mt-2">+3 this week</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {conversionFunnelData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-xs font-medium text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.value} candidates</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Candidate Status Pie */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Candidate Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={candidateStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {candidateStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time to Hire */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Avg Time per Step</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeToHireData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="step" stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="days" fill="#42999f" name="Days" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pipeline Trend */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Pipeline Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '0.75rem' }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#42999f" strokeWidth={2} />
              <Line type="monotone" dataKey="interviews" stroke="#fbbf24" strokeWidth={2} />
              <Line type="monotone" dataKey="offers" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
