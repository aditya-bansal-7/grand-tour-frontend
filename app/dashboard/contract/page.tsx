'use client'

import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyStudentProfile } from '@/lib/student-profile'
import { Lock, Download, FileText } from 'lucide-react'

export default function ContractPage() {
  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Contract</h1>
          <p className="text-muted-foreground">Review and sign your internship contract</p>
        </div>

        <Card className="p-8 border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">This Step is Locked</h2>
              <p className="text-gray-700 mt-1">Complete payment and selection to unlock contract signing</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contract Overview
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your contract will include important details about:
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span>•</span>
              <span>Internship duration and dates</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Your roles and responsibilities</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Terms and conditions</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Code of conduct</span>
            </li>
            <li className="flex gap-3">
              <span>•</span>
              <span>Confidentiality agreements</span>
            </li>
          </ul>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-900">
            <span className="font-semibold">Important:</span> Please read the contract carefully before signing. You will need to upload a digitally signed copy.
          </p>
        </Card>
      </div>
    </StudentLayout>
  )
}
