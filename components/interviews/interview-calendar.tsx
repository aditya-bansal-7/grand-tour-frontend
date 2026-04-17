'use client'

import { useState } from 'react'
import { dummyInterviews, Interview, InterviewStatus } from '@/lib/interview-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react'

export function InterviewCalendar() {
  const [interviews, setInterviews] = useState<Interview[]>(dummyInterviews)
  const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 1))
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('list')

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getStatusColor = (status: InterviewStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
    }
  }

  const upcomingInterviews = interviews
    .filter((i) => i.status === 'pending' || i.status === 'rescheduled')
    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
    .slice(0, 10)

  return (
    <div className="space-y-4">
      {/* Calendar controls */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-semibold min-w-[150px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button className="gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Interview
          </Button>
        </div>
      </Card>

      {/* List view - Upcoming Interviews */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Upcoming Interviews</h3>
          {upcomingInterviews.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">No upcoming interviews scheduled</Card>
          ) : (
            upcomingInterviews.map((interview) => (
              <Card key={interview.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{interview.candidateName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{interview.type}</p>

                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {interview.scheduledDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {interview.scheduledDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      {interview.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {interview.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(interview.status)}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                    <div className="text-xs text-muted-foreground text-right">
                      <p>Interviewer</p>
                      <p className="font-medium text-foreground">{interview.interviewerName}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Month view - Calendar grid */}
      {viewMode === 'month' && (
        <Card className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-semibold text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 text-muted-foreground"></div>
            ))}

            {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
              const day = i + 1
              const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const dayInterviews = interviews.filter(
                (int) => int.scheduledDate.toDateString() === dateStr.toDateString()
              )

              return (
                <div
                  key={`day-${day}`}
                  className="p-2 border border-border rounded-lg min-h-[80px] bg-card hover:bg-secondary transition-colors"
                >
                  <p className="font-semibold text-sm text-foreground mb-1">{day}</p>
                  {dayInterviews.slice(0, 2).map((int) => (
                    <div
                      key={int.id}
                      className="text-xs bg-primary text-primary-foreground p-1 rounded mb-0.5 truncate"
                    >
                      {int.candidateName}
                    </div>
                  ))}
                  {dayInterviews.length > 2 && (
                    <p className="text-xs text-muted-foreground">+{dayInterviews.length - 2} more</p>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
