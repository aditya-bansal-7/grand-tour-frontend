'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile, dummyDocuments, UploadedDocument } from '@/lib/student-profile'
import { Upload, Download, CheckCircle, AlertCircle, Clock } from 'lucide-react'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>(dummyDocuments)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-50 border-l-green-500 text-green-700'
      case 'rejected': return 'bg-red-50 border-l-red-500 text-red-700'
      case 'pending': return 'bg-yellow-50 border-l-yellow-500 text-yellow-700'
      default: return 'bg-gray-50 border-l-gray-500 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <AlertCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  const requiredDocuments = [
    { type: 'cv', label: 'Resume/CV', description: 'Your updated resume or CV' },
    { type: 'photo', label: 'Passport Photo', description: 'Recent passport-sized photo' },
    { type: 'passport', label: 'Passport Pages', description: 'Scanned copy of passport' },
    { type: 'itar', label: 'Sponsor ITR', description: 'Income Tax Return of Sponsor' },
  ]

  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Upload and manage your required documents</p>
        </div>

        {/* Upload Area */}
        <Card className="p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Drag and drop your documents</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <Button size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Choose Files
            </Button>
          </div>
        </Card>

        {/* Uploaded Documents */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Documents</h2>
          {documents.map((doc) => (
            <Card key={doc.id} className={`p-4 border-l-4 ${getStatusColor(doc.status)}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl mt-0.5">📄</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">Uploaded {doc.uploadedAt}</p>
                    {doc.feedback && (
                      <p className="text-xs mt-2 p-2 bg-white/50 rounded">{doc.feedback}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getStatusIcon(doc.status)}
                  <span className="text-xs font-semibold capitalize">{doc.status}</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Required Documents Checklist */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Required Documents Checklist</h2>
          <div className="space-y-3">
            {requiredDocuments.map((doc) => {
              const uploaded = documents.find(d => d.type === doc.type)
              return (
                <div key={doc.type} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    uploaded ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {uploaded && <span className="text-white text-sm">✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{doc.label}</p>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                  {!uploaded && (
                    <Button variant="outline" size="sm">Upload</Button>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        <div className="flex gap-2">
          <Button className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Submit Documents
          </Button>
          <Button variant="outline">Save as Draft</Button>
        </div>
      </div>
    </StudentLayout>
  )
}
