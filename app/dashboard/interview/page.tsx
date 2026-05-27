'use client'

import { useState, useEffect } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { applicationService, interviewService } from '@/lib/services/api.service'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { 
  Loader2, ChevronLeft, ChevronRight, Video, 
  Calendar as CalendarIcon, FileText, Code2, Lightbulb, User
} from 'lucide-react'
import { format, isSameDay, addDays, subDays } from 'date-fns'

export default function InterviewPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [slots, setSlots] = useState<any[]>([])
  
  // Hardcoded for demo/UI matching to the image
  const [currentMonth, setCurrentMonth] = useState(new Date('2023-10-01'))
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2023-10-05'))
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>('dummy-slot-2')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [appData, slotData] = await Promise.all([
          applicationService.getMy(),
          interviewService.getAvailableSlots().catch(() => [])
        ])
        setApplication(appData)
        setSlots(slotData || [])
      } catch (error: any) {
        toast.error('Failed to load interview data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleBook = async () => {
    toast.success('Interview scheduled successfully!')
    router.push('/dashboard/selection')
  }

  const interviewHeader = (
    <div className="flex flex-col">
      <span className="text-[9px] font-bold tracking-widest uppercase text-[#4D6B19]">PREPARATION PHASE</span>
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] leading-none mt-1">Interview Hub</h1>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#C6F16D] animate-spin" />
      </div>
    )
  }

  return (
    <StudentLayout currentStep="interview" headerContent={interviewHeader}>
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Calendar Widget Card */}
            <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Schedule Your Slot</h3>
                  <p className="text-sm text-[#666666] mt-1">Select an available time for your Technical Assessment.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="bg-[#F5F5F5] px-4 py-2 rounded-xl text-sm font-bold text-[#1A1A1A]">
                    October 2023
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mock Calendar Grid */}
              <div className="space-y-6">
                <div className="grid grid-cols-7 text-center">
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                    <div key={day} className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-6 text-center text-sm font-bold text-[#1A1A1A]">
                  <div className="text-gray-300">25</div>
                  <div className="text-gray-300">26</div>
                  <div className="text-gray-300">27</div>
                  <div className="text-gray-300">28</div>
                  <div className="text-gray-300">29</div>
                  <div className="text-gray-300">30</div>
                  <div>1</div>
                  
                  <div>2</div>
                  <div className="relative">
                    3
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C6F16D]" />
                  </div>
                  <div>4</div>
                  <div className="bg-[#C6F16D] text-[#1A1A1A] w-12 h-12 rounded-xl flex flex-col items-center justify-center mx-auto -mt-3 shadow-lg shadow-[#C6F16D]/30">
                    <span>5</span>
                    <span className="text-[8px] tracking-widest uppercase mt-0.5">TODAY</span>
                  </div>
                  <div className="relative">
                    6
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E9D5FF]" />
                  </div>
                  <div>7</div>
                  <div>8</div>

                  <div>9</div>
                  <div>10</div>
                  <div>11</div>
                  <div>12</div>
                  <div>13</div>
                  <div>14</div>
                  <div>15</div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">AVAILABLE TIMES FOR OCT 12</p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-[#1A1A1A] hover:border-[#C6F16D] transition-colors">
                    09:00 AM
                  </button>
                  <button className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-[#1A1A1A] hover:border-[#C6F16D] transition-colors">
                    11:30 AM
                  </button>
                  <button className="px-6 py-2.5 rounded-full bg-[#C6F16D] border-[#C6F16D] text-sm font-bold text-[#1A1A1A] shadow-md shadow-[#C6F16D]/20">
                    02:00 PM
                  </button>
                  <button className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-[#1A1A1A] hover:border-[#C6F16D] transition-colors">
                    04:30 PM
                  </button>
                </div>
              </div>
            </Card>

            {/* Booking History */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#8B5CF6]" />
                Booking History
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-5 bg-[#F9F9F9] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-[#4D6B19] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#4D6B19] rounded-full" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">Initial Screening</p>
                      <p className="text-[11px] text-[#666666] font-medium mt-0.5">Completed • Sept 28, 2023</p>
                    </div>
                  </div>
                  <span className="bg-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase text-gray-500 shadow-sm border border-gray-100">
                    FEEDBACK SENT
                  </span>
                </div>

                <div className="flex items-center justify-between p-5 bg-[#F9F9F9] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-[#8B5CF6] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">Portfolio Review</p>
                      <p className="text-[11px] text-[#666666] font-medium mt-0.5">Completed • Oct 02, 2023</p>
                    </div>
                  </div>
                  <span className="bg-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase text-gray-500 shadow-sm border border-gray-100">
                    PASSED
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Upcoming Interview Card */}
            <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] bg-[#1A1A1A] text-white">
              <div className="flex items-center justify-between mb-8">
                <span className="bg-[#C6F16D] text-[#1A1A1A] px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                  UPCOMING
                </span>
                <Video className="w-5 h-5 text-[#C6F16D]" />
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white">Technical Deep Dive</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                This session covers system design, algorithm proficiency, and real-time coding challenges.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <CalendarIcon className="w-5 h-5 text-[#C6F16D] shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">DATE & TIME</p>
                    <p className="text-sm font-bold text-white mt-0.5">Oct 12, 2:00 PM EST</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <User className="w-5 h-5 text-[#C6F16D] shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">INTERVIEWER</p>
                    <p className="text-sm font-bold text-white mt-0.5">Sarah Jenkins, Senior Eng.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#262626] rounded-2xl p-4 mb-6 border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold tracking-widest uppercase text-[#C6F16D] mb-1">MEETING ACCESS</p>
                    <p className="text-xs font-mono text-gray-300">meet.google.com/abc-defg-hij</p>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors" onClick={() => toast.success('Link copied!')}>
                    <Code2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleBook}
                className="w-full bg-[#C6F16D] hover:bg-[#b5e359] text-[#1A1A1A] font-bold h-12 rounded-xl"
              >
                Join Meeting
              </Button>
            </Card>

            {/* Prep Resources */}
            <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-[#EADDFF]">
              <h3 className="text-xl font-bold text-[#4F378B] mb-6">Prep Resources</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <FileText className="w-5 h-5 text-[#4F378B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#4F378B]">Technical Rubric</p>
                    <p className="text-xs text-[#4F378B]/70 mt-0.5">Review what our engineers look for.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Code2 className="w-5 h-5 text-[#4F378B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#4F378B]">Sandboxed Environment</p>
                    <p className="text-xs text-[#4F378B]/70 mt-0.5">Practice in our custom IDE.</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-white/50 hover:bg-white text-[#4F378B] font-bold h-12 rounded-xl border-none">
                View All Resources
              </Button>
            </Card>

            {/* Mentor Tip */}
            <div className="bg-[#F9F9F9] rounded-2xl p-6 border-l-4 border-[#8B5CF6]">
              <div className="flex gap-4">
                <Lightbulb className="w-6 h-6 text-[#8B5CF6] shrink-0" />
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">MENTOR TIP</p>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed font-medium">
                    &quot;Don&apos;t just solve the problem—explain your thought process aloud. We value how you think over the final answer.&quot;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </StudentLayout>
  )
}
