'use client'

import { use } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout-wrapper'
import { Header } from '@/components/dashboard/header'
import { DynamicPageContentEditor } from '@/components/admin/dynamic-page-content-editor'
import { ProfileBuilderStep } from '@/components/student/profile-builder-step'

const defaultPreviewApplication = {
  user: {
    firstName: 'Avery',
    lastName: 'Morgan',
    email: 'avery.morgan@example.com',
  },
  passportNumber: 'E1234567',
  passportConfirmed: true,
  educationalInstitution: 'Metropolitan Institute of Technology',
  enrollmentStatus: 'Active Candidate',
  cgpa: 8.8,
  preferredDepartment: 'Journalism',
  preferredStartDate: '2026-07-15',
  statementOfPurpose: 'This internship will help me sharpen my editorial voice, build a resilient research practice, and contribute thoughtfully to campus storytelling initiatives across editorial, digital, and publishing teams.',
  data: {
    passportConfirmed: true,
    cgpa: 8.8,
    preferredStartDate: '2026-07-15',
  },
}

const STEP_EDITOR_CONFIGS: Record<string, { label: string; pageKey: string; description: string; previewComponent?: React.ComponentType<any>; previewComponentProps?: Record<string, any> }> = {
  applications: {
    label: 'Applications',
    pageKey: 'application',
    description: 'Manage the student-facing application step content and preview the application form.',
    previewComponent: ProfileBuilderStep,
    previewComponentProps: {
      application: defaultPreviewApplication,
      onSubmit: async () => undefined,
      submitting: false,
    },
  },
  documents: {
    label: 'Documents',
    pageKey: 'documents',
    description: 'Manage the document step content used in the student workflow.',
  },
}

export default function AdminStepEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const config = STEP_EDITOR_CONFIGS[slug]

  if (!config) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <Header title="Step Editor" description="Select a step editor from the sidebar." />
          <div className="rounded-lg border border-border p-6 text-sm text-muted-foreground">
            Unsupported step editor requested.
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <Header
          title={`${config.label} Step Editor`}
          description={config.description}
        />
        <DynamicPageContentEditor
          pageKey={config.pageKey}
          builderTitle={`${config.label} Step Builder`}
          builderDescription={config.description}
          previewComponent={config.previewComponent}
          previewComponentProps={config.previewComponentProps}
        />
      </div>
    </DashboardLayout>
  )
}
