'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, User, Briefcase, GraduationCap } from 'lucide-react'

export function ProfileBuilderStep({ application, onSubmit, submitting }: any) {
  const user = application?.user || {}
  
  const [formData, setFormData] = useState({
    passportNumber: application?.passportNumber || '',
    educationalInstitution: application?.educationalInstitution || '',
    enrollmentStatus: application?.enrollmentStatus || 'Active Candidate',
    preferredDepartment: application?.preferredDepartment || '',
    statementOfPurpose: application?.statementOfPurpose || '',
  })

  const handleFormSubmit = () => {
    const updatedApp = {
      ...application,
      passportNumber: formData.passportNumber,
      educationalInstitution: formData.educationalInstitution,
      enrollmentStatus: formData.enrollmentStatus,
      preferredDepartment: formData.preferredDepartment,
      statementOfPurpose: formData.statementOfPurpose,
    }
    onSubmit({}, updatedApp)
  }

  const wordCount = formData.statementOfPurpose.trim().split(/\s+/).filter((w: string) => w.length > 0).length

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A]">Build Your Editorial Profile</h1>
        <p className="text-[#666666] text-lg">Phase 2: Defining your academic and professional coordinates.</p>
        
        {/* Step Progress Bar */}
        <div className="flex items-center gap-2 mt-6">
          <div className="h-1.5 w-16 bg-[#4D6B19] rounded-full"></div>
          <div className="h-1.5 w-16 bg-[#C6F16D] rounded-full"></div>
          <div className="h-1.5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-1.5 w-16 bg-gray-200 rounded-full"></div>
          <span className="ml-4 text-[10px] font-bold tracking-widest uppercase text-[#4D6B19]">
            Step 2 of 4 Complete
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Personal Credentials */}
          <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <User className="w-5 h-5 text-[#8B48F6]" />
              Personal Credentials
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">Full Legal Name</label>
                <input 
                  type="text"
                  value={`${user.firstName || ''} ${user.lastName || ''}`}
                  disabled
                  className="w-full bg-[#F5F5F5] h-12 rounded-xl text-[#1A1A1A] font-medium px-4 border-none outline-none opacity-60 cursor-not-allowed"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">Primary Email</label>
                  <input 
                    type="text"
                    value={user.email || ''}
                    disabled
                    className="w-full bg-[#F5F5F5] h-12 rounded-xl text-[#1A1A1A] font-medium px-4 border-none outline-none opacity-60 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">Passport Number</label>
                  <input 
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                    placeholder="E1234567"
                    className="w-full bg-[#F5F5F5] h-12 rounded-xl text-[#1A1A1A] font-medium px-4 border-none outline-none focus:bg-white focus:ring-2 focus:ring-[#C6F16D]/50 transition-colors placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Academic Nexus */}
          <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-[#F9F9F9]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#4D6B19]" />
              Academic Nexus
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">Educational Institution</label>
                <input 
                  type="text"
                  value={formData.educationalInstitution}
                  onChange={(e) => setFormData({...formData, educationalInstitution: e.target.value})}
                  placeholder="Metropolitan Institute of Technology"
                  className="w-full bg-white h-12 rounded-xl text-[#1A1A1A] font-medium px-4 border-none outline-none focus:ring-2 focus:ring-[#C6F16D]/50 transition-colors"
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">
                  B.Tech Enrollment<br/>Status:
                </label>
                
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="enrollmentStatus" 
                      value="Active Candidate"
                      checked={formData.enrollmentStatus === 'Active Candidate'}
                      onChange={(e) => setFormData({...formData, enrollmentStatus: e.target.value})}
                      className="w-4 h-4 accent-[#4D6B19]"
                    />
                    <span className="font-medium text-sm">Active Candidate</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="enrollmentStatus" 
                      value="Alumni"
                      checked={formData.enrollmentStatus === 'Alumni'}
                      onChange={(e) => setFormData({...formData, enrollmentStatus: e.target.value})}
                      className="w-4 h-4 accent-[#4D6B19]"
                    />
                    <span className="font-medium text-sm text-gray-600">Alumni</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#8B48F6]" />
              Journey Intent
            </h3>
            
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">Preferred Department</label>
                <select 
                  value={formData.preferredDepartment}
                  onChange={(e) => setFormData({...formData, preferredDepartment: e.target.value})}
                  className="w-full bg-[#F5F5F5] h-12 rounded-xl text-[#1A1A1A] font-medium px-4 border-none outline-none focus:ring-2 focus:ring-[#C6F16D]/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Editorial Track</option>
                  <option value="Journalism">Journalism</option>
                  <option value="Digital Media">Digital Media</option>
                  <option value="Publishing">Publishing</option>
                  <option value="Content Strategy">Content Strategy</option>
                </select>
              </div>
              
              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-[10px] font-bold text-[#666666] tracking-widest uppercase">Statement of Purpose (250 Words)</label>
                <textarea 
                  value={formData.statementOfPurpose}
                  onChange={(e) => setFormData({...formData, statementOfPurpose: e.target.value})}
                  placeholder="Describe your vision for this editorial internship..."
                  className="w-full bg-[#F5F5F5] rounded-xl flex-1 resize-none text-[#1A1A1A] font-medium p-4 border-none outline-none focus:ring-2 focus:ring-[#C6F16D]/50 focus:bg-white transition-colors min-h-[200px] placeholder:text-gray-400"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">MINIMALISM PREFERRED</span>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${wordCount > 250 ? 'text-red-500' : 'text-gray-400'}`}>
                    {wordCount} / 250 WORDS
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-8 border-t border-gray-100">
        <Button variant="ghost" className="text-[#666666] font-medium hover:bg-gray-100 rounded-xl" onClick={() => window.history.back()}>
          ← Save & Exit Journey
        </Button>
        
        <div className="flex items-center">
          <Button 
            type="button"
            onClick={handleFormSubmit}
            disabled={submitting || wordCount > 250}
            className="bg-[#C6F16D] hover:bg-[#b5e359] text-[#1A1A1A] font-bold h-12 px-8 rounded-l-2xl rounded-r-none tracking-widest uppercase"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            Advance
          </Button>
          <div className="bg-[#1A1A1A] text-white h-12 px-6 rounded-r-2xl rounded-l-none flex items-center justify-center border-l border-white/20">
            <div className="flex flex-col">
              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-0.5">Overall Completion</span>
              <span className="text-xs font-bold leading-none">50% Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
