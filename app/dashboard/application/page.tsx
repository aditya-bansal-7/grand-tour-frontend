'use client'

import { useState, useEffect, useMemo } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { applicationService, workflowService } from '@/lib/services/api.service'
import { DynamicForm } from '@/components/student/dynamic-form'
import { CheckCircle, Loader2, AlertCircle, X, Clock, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function ApplicationPage() {
  const router = useRouter()
  const [application, setApplication] = useState<any>(null)
  const [workflow, setWorkflow] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

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
      } catch (error: any) {
        toast.error('Failed to load application data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Find the step configuration. Fallback to the first step if no ID matches 'application'
  const applicationStep = useMemo(() => {
    if (!workflow?.steps) return null
    return workflow.steps.find((s: any) => 
      s.id === 'application' || s.name?.toLowerCase().includes('application')
    ) || workflow.steps[0]
  }, [workflow])

  const handleSubmit = async (formData: any) => {
    toast.info('Saving your progress...')
    try {
      setSubmitting(true)

      // Nest data by Stage and Section
      const stageName = applicationStep?.name || 'Application'
      const nestedData: any = { [stageName]: {} }
      
      let currentSectionName = 'General'
      applicationStep?.fields.forEach((f: any) => {
        if (f.type === 'section') {
          currentSectionName = f.name
        } else {
          if (!nestedData[stageName][currentSectionName]) {
            nestedData[stageName][currentSectionName] = {}
          }
          if (formData[f.id] !== undefined) {
            // Store by field name for better readability in admin
            nestedData[stageName][currentSectionName][f.name] = formData[f.id]
          }
        }
      })

      // Determine next step
      let nextStepId = application?.currentStepId || 'application'
      if (workflow?.steps && workflow.steps.length > 0) {
        const currentStepIdx = workflow.steps.findIndex((s: any) => s.id === applicationStep?.id)
        if (currentStepIdx !== -1 && currentStepIdx < workflow.steps.length - 1) {
          nextStepId = workflow.steps[currentStepIdx + 1].id
        } else if (currentStepIdx === -1) {
          nextStepId = workflow.steps[0].id
        }
      }

      const newApp = await applicationService.create({
        status: 'DRAFT',
        currentStepId: nextStepId,
        data: { ...(application?.data || {}), ...nestedData }
      })
      
      setApplication(newApp)
      toast.success('Information saved!')

      if (nextStepId !== 'application') {
        router.push(`/dashboard/${nextStepId}`)
      }
    } catch (error: any) {
      console.error('Submit error:', error)
      toast.error(error.message || 'Failed to save progress')
    } finally {
      setSubmitting(false)
    }
  }

  const initialFormData = useMemo(() => {
    if (!application?.data || !applicationStep?.fields) return {}
    
    const flatData: any = {}
    const stageName = applicationStep.name || 'Application'
    const stageData = application.data[stageName]
    
    applicationStep.fields.forEach((f: any) => {
      if (f.type === 'section') return
      
      if (stageData) {
        for (const sectionName in stageData) {
          if (stageData[sectionName][f.name] !== undefined) {
            flatData[f.id] = stageData[sectionName][f.name]
            break
          }
        }
      }
      
      if (flatData[f.id] === undefined && application.data[f.id] !== undefined) {
        flatData[f.id] = application.data[f.id]
      }
    })
    
    return flatData
  }, [application, applicationStep])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  // If no application exists, show the form
  if (!application) {
    if (!applicationStep) {
      return (
        <StudentLayout currentStep="application">
          <Card className="p-12 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-bold">No Application Form Configured</h2>
            <p className="text-muted-foreground">Please contact the administrator to set up the application workflow.</p>
          </Card>
        </StudentLayout>
      )
    }

    return (
      <StudentLayout currentStep="application">
        <div className="max-w-4xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{applicationStep.name}</h1>
            <p className="text-muted-foreground">{applicationStep.description || 'Please provide your basic information to start the application'}</p>
          </div>
          
          <DynamicForm 
            key={applicationStep?.id || 'new'}
            fields={applicationStep.fields || []} 
            onSubmit={handleSubmit} 
            initialData={initialFormData}
            submitting={submitting}
            buttonText="Save & Continue to Next Step"
            applicationId={application?.id}
          />
        </div>
      </StudentLayout>
    )
  }

  // If application exists, show the summary and a way to continue
  const fields = applicationStep?.fields || []
  const summarySections: any[] = []
  let tempSec = { name: 'Basic Information', fields: [] as any[] }

  fields.forEach((field: any) => {
    if (field.type === 'section') {
      if (tempSec.fields.length > 0) summarySections.push(tempSec)
      tempSec = { name: field.name, fields: [] }
    } else {
      tempSec.fields.push(field)
    }
  })
  if (tempSec.fields.length > 0) summarySections.push(tempSec)

  return (
    <StudentLayout currentStep="application">
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Application Summary</h1>
            <p className="text-muted-foreground">Review your submitted information</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${
            application.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-600' : 
            application.status === 'ACCEPTED' ? 'bg-green-500/10 text-green-600' : 'bg-primary/10 text-primary'
          }`}>
            <Clock className="w-4 h-4" />
            {application.status}
          </div>
        </div>

        <div className="grid gap-6">
          {summarySections.map((section, idx) => (
            <Card key={idx} className="p-6 border-2 border-primary/5">
              <h2 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                {section.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {section.fields.map((field: any) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{field.name}</label>
                    <p className="text-foreground font-medium">
                      {(() => {
                        if (field.id === 'fullName') return `${application.user?.firstName} ${application.user?.lastName}`
                        if (application[field.id]) return application[field.id]
                        
                        const stageName = applicationStep?.name || 'Application'
                        const stageData = application.data?.[stageName]
                        if (stageData) {
                          for (const secName in stageData) {
                            if (stageData[secName][field.name] !== undefined) {
                              return stageData[secName][field.name]
                            }
                          }
                        }
                        
                        // Fallback to old flat data if exists
                        return application.data?.[field.id] || 'N/A'
                      })()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <Button variant="outline" onClick={() => window.print()} className="h-12 px-8">Download as PDF</Button>
          
          {/* If it's a draft, allow them to continue to the next step */}
          {application.status === 'DRAFT' && (
            <Button 
              onClick={() => {
                const nextStepId = application.currentStepId || 'application'
                if (nextStepId !== 'application') {
                  router.push(`/dashboard/${nextStepId}`)
                } else if (workflow?.steps?.length > 1) {
                  router.push(`/dashboard/${workflow.steps[1].id}`)
                }
              }}
              className="h-12 px-8 gap-2 bg-primary shadow-lg shadow-primary/20"
            >
              Continue to Next Stage
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </StudentLayout>
  )
}
