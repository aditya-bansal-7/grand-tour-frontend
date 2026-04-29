"use client"

import { useState } from "react"
import { Search, Mail, Bell, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileNav } from "./mobile-nav"
import { SearchModal } from "@/components/search/search-modal"
import { NotificationsModal } from "@/components/notifications/notifications-modal"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { notificationService } from "@/lib/services/api.service"
import type { ReactNode } from "react"

interface HeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

export function Header({ title, description, actions }: HeaderProps) {
  const { data: session, status } = useSession()
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  useEffect(() => {
    const checkUnread = async () => {
      try {
        const notes = await notificationService.getAll()
        setHasUnread(notes.some((n: any) => !n.isRead))
      } catch (error) {
        // Silent error
      }
    }
    checkUnread()
    
    // Check every minute
    const interval = setInterval(checkUnread, 60000)
    return () => clearInterval(interval)
  }, [])

  const user = session?.user as any
  const fullName = user ? `${user.firstName || user.name} ${user.lastName || ''}`.trim() : "Loading..."
  const userRole = user?.role || "USER"
  const userImage = user?.image || user?.profileImage

  return (
    <header className="space-y-3 md:space-y-4 animate-slide-in-up">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <MobileNav />

          <div className="relative flex-1 max-w-md cursor-pointer" onClick={() => setShowSearchModal(true)}>
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates, workflows..."
              className="pl-9 pr-3 md:pr-16 h-9 text-sm bg-card border-border transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
              readOnly
            />
            <kbd className="hidden md:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-muted rounded border border-border">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-secondary transition-all duration-300 hover:scale-110 h-8 w-8"
            title="Messages"
          >
            <Mail className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-secondary transition-all duration-300 hover:scale-110 h-8 w-8"
            title="Notifications"
            onClick={() => setShowNotificationsModal(true)}
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
            )}
          </Button>

          <div className="flex items-center gap-2 pl-2 md:pl-3 border-l border-border">
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Avatar className="w-7 h-7 md:w-8 md:h-8 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
                  <AvatarImage src={userImage} alt={fullName} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                    {fullName.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs hidden sm:block">
                  <p className="font-semibold text-foreground truncate max-w-[120px]">{fullName}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-tight">{userRole}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">{title}</h1>
        <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
      </div>

      {actions && <div className="flex flex-col sm:flex-row gap-2">{actions}</div>}
      
      {showSearchModal && <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />}
      {showNotificationsModal && <NotificationsModal isOpen={showNotificationsModal} onClose={() => setShowNotificationsModal(false)} />}
    </header>
  )
}
