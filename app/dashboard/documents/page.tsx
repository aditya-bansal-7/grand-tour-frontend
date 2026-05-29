'use client'

import { useState, useEffect } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Button } from '@/components/ui/button'
import { applicationPageContentService, applicationService, workflowService } from '@/lib/services/api.service'
import UploadPopup from '@/components/UploadPopup'
import { DocumentsStepPreview } from '@/components/student/documents-step-preview'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function DocumentsPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const token = (session as any)?.accessToken || ''
  const [application, setApplication] = useState<any>(null)
  const [workflow, setWorkflow] = useState<any>(null)
  const [pageContent, setPageContent] = useState<any>(null)
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
        const [appData, wfData, contentData] = await Promise.all([
          applicationService.getMy(),
          workflowService.get(),
          applicationPageContentService.get('documents')
        ])
        setApplication(appData)
        setWorkflow(wfData)
        setPageContent(contentData)

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
        <DocumentsStepPreview
          pageContent={pageContent}
          uploadedDocs={uploadedDocs}
          onUpload={openUpload}
        />

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
