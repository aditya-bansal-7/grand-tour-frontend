'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Check, Archive, Trash2, X, Filter } from 'lucide-react'

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
  interview: 'bg-blue-50 border-l-4 border-blue-500',
  candidate: 'bg-green-50 border-l-4 border-green-500',
  document: 'bg-purple-50 border-l-4 border-purple-500',
  workflow: 'bg-orange-50 border-l-4 border-orange-500',
  system: 'bg-gray-50 border-l-4 border-gray-500',
}

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>(notificationSamples)
  const [filterUnread, setFilterUnread] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const filteredNotifications = filterUnread
    ? notifications.filter((n) => !n.read)
    : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleArchive = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([])
    }
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
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 p-4">
      <Card className="w-full max-w-md h-[calc(100vh-100px)] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter */}
        <div className="p-3 border-b border-border flex gap-2">
          <Button
            variant={filterUnread ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterUnread(!filterUnread)}
            className="gap-1 text-xs"
          >
            <Filter className="w-3 h-3" />
            Unread
          </Button>
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-xs ml-auto"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground opacity-30 mb-4" />
              <p className="text-muted-foreground">
                {filterUnread ? 'No unread notifications' : 'No notifications'}
              </p>
            </div>
          ) : (
            <div className="space-y-2 p-3">
              {filteredNotifications.map((notification) => {
                const styleClass = typeStyles[notification.type]
                return (
                  <div key={notification.id} className={`p-3 rounded-lg ${styleClass}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>

                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                      )}
                    </div>

                    <div className="flex gap-1 mt-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkRead(notification.id)}
                          className="gap-1 text-xs h-7"
                        >
                          <Check className="w-3 h-3" />
                          Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleArchive(notification.id)}
                        className="gap-1 text-xs h-7 ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Showing {filteredNotifications.length} of {notifications.length}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
