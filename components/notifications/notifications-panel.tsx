'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Check, Archive, X } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'interview' | 'candidate' | 'document' | 'workflow' | 'system'
  timestamp: Date
  read: boolean
  actionUrl?: string
}

const notificationSamples: Notification[] = [
  {
    id: '1',
    title: 'Interview Scheduled',
    message: 'John Smith has been scheduled for a technical interview on 2024-04-20 at 2:00 PM',
    type: 'interview',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: false,
    actionUrl: '/interviews',
  },
  {
    id: '2',
    title: 'Candidate Applied',
    message: 'Sarah Johnson applied for the Product Manager position',
    type: 'candidate',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
    actionUrl: '/candidates',
  },
  {
    id: '3',
    title: 'Document Uploaded',
    message: 'Resume received for candidate: Emma Davis',
    type: 'document',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: false,
    actionUrl: '/documents',
  },
  {
    id: '4',
    title: 'Workflow Completed',
    message: 'Sales Process workflow has been completed for Michael Brown',
    type: 'workflow',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
    actionUrl: '/workflows',
  },
  {
    id: '5',
    title: 'System Update',
    message: 'CRM system maintenance scheduled for tomorrow at 2:00 AM',
    type: 'system',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '6',
    title: 'Interview Reminder',
    message: 'Reminder: Interview with Lisa Chen in 2 hours',
    type: 'interview',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    read: true,
    actionUrl: '/interviews',
  },
]

const typeStyles = {
  interview: 'bg-blue-50 border-blue-200 text-blue-800',
  candidate: 'bg-green-50 border-green-200 text-green-800',
  document: 'bg-purple-50 border-purple-200 text-purple-800',
  workflow: 'bg-orange-50 border-orange-200 text-orange-800',
  system: 'bg-gray-50 border-gray-200 text-gray-800',
}

const typeBadges = {
  interview: 'Interview',
  candidate: 'Candidate',
  document: 'Document',
  workflow: 'Workflow',
  system: 'System',
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationSamples)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true))
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
            size="sm"
          >
            Unread ({unreadCount})
          </Button>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" onClick={markAllAsRead} size="sm">
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </p>
          </Card>
        ) : (
          filtered.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 border-l-4 cursor-pointer transition-all hover:shadow-md ${
                notification.read ? 'opacity-75' : 'opacity-100'
              } ${typeStyles[notification.type]}`}
              onClick={() => notification.actionUrl && markAsRead(notification.id)}
            >
              <div className="flex gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-opacity-20 bg-current">
                      {typeBadges[notification.type]}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-current flex-shrink-0" />
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{notification.title}</h3>
                  <p className="text-sm text-foreground/80 mb-2">{notification.message}</p>
                  <p className="text-xs text-foreground/60">{formatTime(notification.timestamp)}</p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsRead(notification.id)
                      }}
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                    title="Delete"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {notification.actionUrl && (
                <a href={notification.actionUrl} className="mt-3 inline-block">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </a>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
