'use client'

import { useState, useEffect } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { applicationService, workflowService } from '@/lib/services/api.service'
import UploadPopup from '@/components/UploadPopup'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { 
  Loader2, FileText, Camera, Plane, CheckCircle2, 
  ShieldCheck, Eye, Clock, Upload, ArrowLeft
} from 'lucide-react'

export default function DocumentsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const token = (session as any)?.accessToken || ''
  const [application, setApplication] = useState<any>(null)
  const [workflow, setWorkflow] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Upload popup states
  const [uploadOpen, setUploadOpen] = useState(false)
  const [activeDocType, setActiveDocType] = useState<string>('')
  const [activeDocName, setActiveDocName] = useState<string>('')

  // Track uploaded docs
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [appData, wfData] = await Promise.all([
          applicationService.getMy(),
          workflowService.get()
        ])
        setApplication(appData)
        setWorkflow(wfData)

        // Pre-populate uploaded docs from application.documents
        if (appData?.documents) {
          const docs: Record<string, any> = {}
          appData.documents.forEach((d: any) => {
            docs[d.type] = d
          })
          setUploadedDocs(docs)
        }
      } catch (error: any) {
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const openUpload = (docType: string, docName: string) => {
    setActiveDocType(docType)
    setActiveDocName(docName)
    setUploadOpen(true)
  }

  const handleUploadComplete = (data: any) => {
    setUploadedDocs(prev => ({ ...prev, [activeDocType]: data }))
    toast.success(`${activeDocName} uploaded successfully!`)
  }

  const handleContinue = async () => {
    try {
      setSubmitting(true)
      
      // Determine next step
      let nextStepId = 'documents'
      if (workflow?.steps) {
        const currentIdx = workflow.steps.findIndex((s: any) => s.id === 'documents')
        if (currentIdx !== -1 && currentIdx < workflow.steps.length - 1) {
          nextStepId = workflow.steps[currentIdx + 1].id
        }
      }

      await applicationService.create({
        ...application,
        status: 'DRAFT',
        currentStepId: nextStepId,
      })

      toast.success('Documents saved!')
      router.push(`/dashboard/${nextStepId}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to save')
    } finally {
      setSubmitting(false)
    }
  }

  const getDocStatus = (type: string) => {
    const doc = uploadedDocs[type]
    if (!doc) return 'NOT UPLOADED'
    if (doc.status === 'APPROVED') return 'APPROVED'
    if (doc.status === 'REJECTED') return 'REJECTED'
    return 'PENDING VERIFICATION'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-700 border-green-200'
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200'
      case 'PENDING VERIFICATION': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-red-100 text-red-600 border-red-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <StudentLayout currentStep="documents">
      <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-[#C6F16D] text-[#1A1A1A] px-3 py-1.5 rounded-full">
                Step 3 of 5
              </span>
              <span className="text-sm font-bold text-[#1A1A1A]">Document Repository</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] leading-tight">
              The Editorial<br/>Compliance
            </h1>
            <p className="text-[#666666] text-base max-w-lg mt-2">
              Securely upload your credentials to advance your internship journey. All files are encrypted and verified by our editorial board within 24 hours.
            </p>
          </div>

          {/* Journey Progress */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-full px-5 py-3">
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#666666]">Journey Progress</span>
              <span className="text-sm font-bold text-[#1A1A1A]">60% Complete</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    step < 3 ? 'bg-[#C6F16D] border-[#C6F16D] text-[#1A1A1A]' :
                    step === 3 ? 'bg-white border-[#C6F16D] text-[#1A1A1A]' :
                    'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column — Documents */}
          <div className="lg:col-span-2 space-y-6">

            {/* CV Upload */}
            <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F0FF] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#8B48F6]" />
                  </div>
                  Professional Curriculum Vitae
                </h3>
                <span className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border ${getStatusColor(getDocStatus('RESUME'))}`}>
                  {getDocStatus('RESUME')}
                </span>
              </div>
              <p className="text-sm text-[#666666] mb-6">
                Highlight your academic achievements and extracurricular contributions. Must include recent experience.
              </p>

              <div 
                onClick={() => openUpload('RESUME', 'Resume / CV')}
                className="border-2 border-dashed border-gray-200 rounded-2xl py-12 px-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#C6F16D] hover:bg-[#FAFFF0] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-[#C6F16D]/20 transition-colors">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#4D6B19]" />
                </div>
                <p className="text-sm text-[#1A1A1A] font-medium">
                  Drop your CV here or <span className="text-[#4D6B19] underline font-bold">browse files</span>
                </p>
                <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400">
                  Supported Formats: PDF (Max 5MB)
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => openUpload('RESUME', 'Resume / CV')}
                  className="bg-[#F5F5F5] hover:bg-[#E8E8E8] text-[#1A1A1A] font-bold rounded-full px-6 h-10 gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload CV
                </Button>
              </div>
            </Card>

            {/* Passport + Photo Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Passport */}
              <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F0F0FF] flex items-center justify-center">
                      <Plane className="w-4 h-4 text-[#6366F1]" />
                    </div>
                    Passport Pages
                  </h3>
                  <span className={`text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${getStatusColor(getDocStatus('PASSPORT'))}`}>
                    {getDocStatus('PASSPORT')}
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">PDF / JPG</p>
                
                <div 
                  onClick={() => openUpload('PASSPORT', 'Passport Copy')}
                  className="border-2 border-dashed border-gray-200 rounded-2xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#C6F16D] hover:bg-[#FAFFF0] transition-all"
                >
                  <Camera className="w-6 h-6 text-gray-300" />
                  <p className="text-xs text-gray-400 font-medium">Scan Bio-Data Page</p>
                </div>

                <Button 
                  onClick={() => openUpload('PASSPORT', 'Passport Copy')}
                  className="w-full mt-4 bg-[#1A1A1A] hover:bg-[#333] text-white font-bold rounded-full h-10 gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Select Passport File
                </Button>
              </Card>

              {/* Official Photo */}
              <Card className="p-6 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF0F5] flex items-center justify-center">
                      <Camera className="w-4 h-4 text-[#E11D48]" />
                    </div>
                    Official Photo
                  </h3>
                  <span className={`text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${getStatusColor(getDocStatus('PHOTO'))}`}>
                    {getDocStatus('PHOTO')}
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">JPG ONLY</p>

                <div className="flex gap-3 mb-4">
                  <div className="w-16 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                    <Camera className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider">Requirements:</p>
                    <ul className="text-[11px] text-gray-500 space-y-0.5">
                      <li>• Neutral background</li>
                      <li>• High contrast, no shadows</li>
                      <li>• Face forward, eyes visible</li>
                    </ul>
                  </div>
                </div>

                <Button 
                  onClick={() => openUpload('PHOTO', 'Official Photo')}
                  className="w-full bg-[#C6F16D] hover:bg-[#b5e359] text-[#1A1A1A] font-bold rounded-full h-10 gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Upload Photo
                </Button>
              </Card>
            </div>
          </div>

          {/* Right Column — Submission Integrity */}
          <div className="lg:col-span-1">
            <Card className="p-8 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white sticky top-32">
              <h3 className="text-xl font-bold mb-6">Submission Integrity</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">LEGIBILITY</p>
                    <p className="text-xs text-gray-500 mt-0.5">Ensure all text and edges are sharp. Scanned documents must be high-resolution.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">AUTHENTICITY</p>
                    <p className="text-xs text-gray-500 mt-0.5">Files must be original copies. Watermarked or edited documents will be rejected.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">VALIDITY</p>
                    <p className="text-xs text-gray-500 mt-0.5">ID and Passports must have at least 6 months validity remaining.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#F5F5F5] rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#4D6B19] shrink-0" />
                <p className="text-[11px] text-gray-500">Your data is protected by AES-256 encryption protocols.</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
          <Button 
            variant="ghost" 
            className="text-[#666666] font-medium hover:bg-gray-100 rounded-xl gap-2" 
            onClick={() => router.push('/dashboard/application')}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Personal Details
          </Button>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost"
              className="text-[#666666] font-medium hover:bg-gray-100 rounded-xl"
            >
              Save Draft
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={submitting}
              className="bg-[#C6F16D] hover:bg-[#b5e359] text-[#1A1A1A] font-bold h-12 px-8 rounded-full tracking-wide gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              Continue to Step 4
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Popup */}
      <UploadPopup
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
        token={token}
        applicationId={application?.id}
        documentType={activeDocType}
        documentName={activeDocName}
      />
    </StudentLayout>
  )
}
