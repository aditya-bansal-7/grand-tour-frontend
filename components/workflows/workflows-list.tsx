'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dummyWorkflows } from '@/lib/workflow-schema'
import { workflowTemplates } from '@/lib/workflow-templates'
import { Plus, Trash2, Edit2, Copy } from 'lucide-react'
import { WorkflowBuilder } from './workflow-builder'

export function WorkflowsList() {
  const [workflows, setWorkflows] = useState(dummyWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [showBuilder, setShowBuilder] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const handleDeleteWorkflow = (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter((w) => w.id !== id))
    }
  }

  const handleUseTemplate = (template: typeof workflowTemplates[0]) => {
    const newWorkflow = {
      ...template,
      id: `wf${Date.now()}`,
      createdAt: new Date(),
      status: 'draft' as const,
    }
    setWorkflows([...workflows, newWorkflow])
    setShowTemplates(false)
  }

  if (showTemplates) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Choose a Template</h2>
          <Button variant="outline" onClick={() => setShowTemplates(false)}>
            Back
          </Button>
        </div>

        <div className="grid gap-4">
          {workflowTemplates.map((template) => (
            <Card key={template.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
                  <div className="flex gap-4 mt-4">
                    <span className="text-xs bg-secondary px-2.5 py-1 rounded-full text-foreground">
                      {template.steps.length} step{template.steps.length !== 1 ? 's' : ''}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        template.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleUseTemplate(template)}
                  className="gap-2 whitespace-nowrap"
                >
                  <Copy className="w-4 h-4" />
                  Use Template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (showBuilder && selectedWorkflow) {
    const workflow = workflows.find((w) => w.id === selectedWorkflow)
    if (workflow) {
      return (
        <WorkflowBuilder
          workflow={workflow}
          onSave={(updated) => {
            setWorkflows(workflows.map((w) => (w.id === updated.id ? updated : w)))
            setShowBuilder(false)
            setSelectedWorkflow(null)
          }}
          onCancel={() => {
            setShowBuilder(false)
            setSelectedWorkflow(null)
          }}
        />
      )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            {workflows.length} workflow{workflows.length !== 1 ? 's' : ''} created
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowTemplates(true)}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            From Template
          </Button>
          <Button
            onClick={() => {
              setSelectedWorkflow(null)
              setShowBuilder(true)
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Workflow
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{workflow.name}</h3>
                {workflow.description && (
                  <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                )}
                <div className="flex gap-4 mt-3">
                  <span className="text-xs bg-secondary px-2.5 py-1 rounded-full text-foreground">
                    {workflow.steps.length} step{workflow.steps.length !== 1 ? 's' : ''}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      workflow.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : workflow.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedWorkflow(workflow.id)
                    setShowBuilder(true)
                  }}
                  className="gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
