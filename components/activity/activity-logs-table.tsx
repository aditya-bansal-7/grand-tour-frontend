'use client'

import { useState } from 'react'
import { dummyActivityLogs, ActivityLog, ActivityType } from '@/lib/activity-data'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Clock } from 'lucide-react'

const activityTypeColors: Record<ActivityType, string> = {
  candidate_created: 'bg-blue-100 text-blue-700',
  candidate_status_changed: 'bg-purple-100 text-purple-700',
  interview_scheduled: 'bg-green-100 text-green-700',
  interview_rescheduled: 'bg-yellow-100 text-yellow-700',
  document_uploaded: 'bg-indigo-100 text-indigo-700',
  document_reviewed: 'bg-teal-100 text-teal-700',
  note_added: 'bg-pink-100 text-pink-700',
  workflow_created: 'bg-cyan-100 text-cyan-700',
  workflow_updated: 'bg-lime-100 text-lime-700',
  user_created: 'bg-orange-100 text-orange-700',
  user_updated: 'bg-rose-100 text-rose-700',
  payment_processed: 'bg-emerald-100 text-emerald-700',
}

const activityTypeLabels: Record<ActivityType, string> = {
  candidate_created: 'Candidate Created',
  candidate_status_changed: 'Status Changed',
  interview_scheduled: 'Interview Scheduled',
  interview_rescheduled: 'Interview Rescheduled',
  document_uploaded: 'Document Uploaded',
  document_reviewed: 'Document Reviewed',
  note_added: 'Note Added',
  workflow_created: 'Workflow Created',
  workflow_updated: 'Workflow Updated',
  user_created: 'User Created',
  user_updated: 'User Updated',
  payment_processed: 'Payment Processed',
}

export function ActivityLogsTable() {
  const [logs, setLogs] = useState<ActivityLog[]>(dummyActivityLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | ActivityType>('all')

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) || false)

    const matchesType = filterType === 'all' || log.type === filterType

    return matchesSearch && matchesType
  })

  const activityTypes = Object.keys(activityTypeLabels) as ActivityType[]

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by user, candidate, or action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | ActivityType)}
            className="px-3 py-2 border border-border rounded-lg text-sm text-foreground"
          >
            <option value="all">All Activity Types</option>
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {activityTypeLabels[type]}
              </option>
            ))}
          </select>

          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredLogs.length} log{filteredLogs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </Card>

      <div className="space-y-2">
        {filteredLogs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No activity logs found matching your search.</p>
          </Card>
        ) : (
          filteredLogs.map((log, index) => (
            <Card key={log.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1" />
                  {index < filteredLogs.length - 1 && (
                    <div className="w-0.5 h-8 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${activityTypeColors[log.type]}`}>
                          {activityTypeLabels[log.type]}
                        </span>
                        {log.candidateName && (
                          <span className="text-xs text-muted-foreground">for {log.candidateName}</span>
                        )}
                      </div>

                      <p className="text-sm text-foreground font-medium">{log.description}</p>

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>By {log.userName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.timestamp.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
