'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getWorkflowSteps } from '@/lib/student-workflow'
import { cn } from '@/lib/utils'
import { 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  User, 
  HelpCircle,
  FileText,
  Calendar,
  DollarSign,
  Building2,
  CheckSquare,
  Shield,
  PlaneTakeoff
} from 'lucide-react'

interface StudentSidebarProps {
  currentStep: string
}

export function StudentSidebar({ currentStep }: StudentSidebarProps) {
  const pathname = usePathname()
  const steps = getWorkflowSteps(currentStep as any)

  return (
    <aside className="w-64 bg-background border-r border-border overflow-y-auto sticky top-0 h-screen">
      <div className="p-6 space-y-8">
        {/* Logo */}
        <Link href="/student" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all group-hover:shadow-lg group-hover:scale-105">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm">Internship</span>
            <span className="text-xs text-muted-foreground">Portal</span>
          </div>
        </Link>

        {/* Progress Overview */}
        <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold text-foreground">{Math.round((steps.filter(s => s.completed).length / steps.length) * 100)}%</span>
              <span className="text-xs text-muted-foreground">{steps.filter(s => s.completed).length} of {steps.length}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
                style={{ width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <nav className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Workflow Steps</h3>
          {steps.map((step) => {
            const getIcon = (stepId: string) => {
              const iconProps = { className: 'w-4 h-4' };
              switch (stepId) {
                case 'application': return <FileText {...iconProps} />;
                case 'documents': return <CheckSquare {...iconProps} />;
                case 'interview': return <Calendar {...iconProps} />;
                case 'selection': return <CheckCircle2 {...iconProps} />;
                case 'payment1': return <DollarSign {...iconProps} />;
                case 'hotel': return <Building2 {...iconProps} />;
                case 'contract': return <FileText {...iconProps} />;
                case 'payment2': return <DollarSign {...iconProps} />;
                case 'workpermit': return <Shield {...iconProps} />;
                case 'finaldocs': return <CheckSquare {...iconProps} />;
                case 'visa': return <Shield {...iconProps} />;
                case 'travel': return <PlaneTakeoff {...iconProps} />;
                default: return null;
              }
            };

            return (
              <Link
                key={step.id}
                href={`/dashboard/${step.id}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  step.completed && 'bg-success/8 hover:bg-success/12 border border-success/20',
                  step.current && 'bg-primary/8 border border-primary/30 hover:bg-primary/12 shadow-sm',
                  step.locked && 'opacity-50 cursor-not-allowed pointer-events-none',
                  !step.completed && !step.current && !step.locked && 'hover:bg-secondary'
                )}
              >
                <div className="flex-shrink-0">
                  {step.completed && <CheckCircle2 className="w-4 h-4 text-success" />}
                  {step.current && <ChevronRight className="w-4 h-4 text-primary" />}
                  {step.locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                  {!step.completed && !step.current && !step.locked && getIcon(step.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-medium truncate',
                    step.completed && 'text-success/80',
                    step.current && 'text-primary font-semibold',
                    step.locked && 'text-muted-foreground/60',
                    !step.completed && !step.current && !step.locked && 'text-foreground'
                  )}>
                    {step.title}
                  </p>
                </div>
                {step.current && <span className="flex-shrink-0 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">Active</span>}
              </Link>
            )
          })}
        </nav>

        {/* Help Section */}
        <div className="pt-4 border-t border-border space-y-3">
          <Link href="/dashboard/profile" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2.5 rounded-lg hover:bg-secondary group">
            <User className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span>My Profile</span>
          </Link>
          <Link href="/dashboard/faq" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors p-2.5 rounded-lg hover:bg-secondary group">
            <HelpCircle className="w-4 h-4 group-hover:text-primary transition-colors" />
            <span>FAQ & Help</span>
          </Link>
          <div className="text-xs text-muted-foreground space-y-2 p-3 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="font-semibold text-foreground text-xs uppercase tracking-wider">Support</p>
            <p className="leading-relaxed">Have questions? Contact us via WhatsApp or email for instant help</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
