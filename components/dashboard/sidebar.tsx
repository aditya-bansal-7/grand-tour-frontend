"use client"

import {
  LayoutDashboard,
  Zap,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Activity,
  Settings,
  Search,
  Bell,
  LogOut,
  ChevronUp,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { permissionService } from "@/lib/services/api.service"

const ALL_MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", feature: "dashboard" },
  { icon: Search, label: "Search", href: "/admin/search", feature: "search" },
  { icon: Zap, label: "Workflows", href: "/admin/workflows", feature: "workflows" },
  { icon: Users, label: "Candidates", href: "/admin/candidates", feature: "candidates" },
  { icon: Calendar, label: "Interviews", href: "/admin/interviews", feature: "interviews" },
  { icon: FileText, label: "Documents", href: "/admin/documents", feature: "documents" },
  { icon: Users, label: "Users", href: "/admin/users", feature: "users" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports", feature: "reports" },
  { icon: Activity, label: "Activity", href: "/admin/activity", feature: "activity", badge: "3" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications", feature: "notifications" },
]

export function Sidebar() {
  const { data: session } = useSession()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [allowedFeatures, setAllowedFeatures] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const user = session?.user as any
  const fullName = user ? `${user.firstName || user.name} ${user.lastName || ''}`.trim() : "User"
  const userRole = user?.role || "ADMIN"
  const userImage = user?.image || user?.profileImage

  useEffect(() => {
    async function fetchPermissions() {
      try {
        if (!userRole) return
        
        const allPermissions = await permissionService.getAll()
        const myPermission = allPermissions.find((p: any) => p.role === userRole)
        
        if (myPermission) {
          setAllowedFeatures(myPermission.features)
        } else if (userRole === 'SUPER_ADMIN') {
          // Fallback for super admin if seed didn't run
          setAllowedFeatures(ALL_MENU_ITEMS.map(i => i.feature).concat(['settings']))
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPermissions()
  }, [userRole])

  const filteredMenuItems = ALL_MENU_ITEMS.filter(item => 
    userRole === 'SUPER_ADMIN' || allowedFeatures.includes(item.feature)
  )

  const showSettings = userRole === 'SUPER_ADMIN' || allowedFeatures.includes('settings')

  return (
    <aside className="fixed top-0 left-0 w-64 bg-card border-r border-border p-4 h-screen overflow-y-auto lg:block flex flex-col">
      <div className="flex items-center gap-2 mb-6 group cursor-pointer">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">CRM Admin</span>
        </Link>
      </div>

      <div className="flex-1 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">Menu</p>
              <nav className="space-y-0.5">
                {filteredMenuItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        hoveredItem === item.label && !isActive && "translate-x-1",
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded-full animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {showSettings && (
              <div>
                <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">General</p>
                <nav className="space-y-0.5">
                  <Link
                    href="/admin/settings"
                    onMouseEnter={() => setHoveredItem("Settings")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      pathname === "/admin/settings"
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      hoveredItem === "Settings" && pathname !== "/admin/settings" && "translate-x-1",
                    )}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                  
                  {userRole === 'SUPER_ADMIN' && (
                    <Link
                      href="/admin/settings/roles"
                      onMouseEnter={() => setHoveredItem("Roles")}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                        pathname === "/admin/settings/roles"
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        hoveredItem === "Roles" && pathname !== "/admin/settings/roles" && "translate-x-1",
                      )}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-sm">Role Access</span>
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* User Profile Section at Bottom */}
      <div className="mt-auto pt-4 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-secondary transition-all duration-300 group">
              <Avatar className="w-9 h-9 border border-border group-hover:border-primary/30 transition-colors">
                <AvatarImage src={userImage} alt={fullName} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold uppercase">
                  {fullName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-semibold text-foreground truncate">{fullName}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{userRole}</p>
              </div>
              <ChevronUp className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mb-2 animate-in slide-in-from-bottom-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer">Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
