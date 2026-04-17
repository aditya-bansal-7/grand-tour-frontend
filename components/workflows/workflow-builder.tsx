'use client'

import { useState } from 'react'
import { Workflow, WorkflowStep, WorkflowField } from '@/lib/workflow-schema'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StepEditor } from './step-editor'
import { GripVertical, Plus, Trash2 } from 'lucide-react'

interface WorkflowBuilderProps {
  workflow?: Workflow
  onSave: (workflow: Workflow) => void
  onCancel: () => void
}

export function WorkflowBuilder({ workflow, onSave, onCancel }: WorkflowBuilderProps) {
  const [name, setName] = useState(workflow?.name || '')
  const [description, setDescription] = useState(workflow?.description || '')
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>(workflow?.status || 'draft')
  const [steps, setSteps] = useState<WorkflowStep[]>(workflow?.steps || [])
  const [editingStepId, setEditingStepId] = useState<string | null>(null)

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      name: 'New Step',
      order: steps.length + 1,
      enabled: true,
      fields: [],
    }
    setSteps([...steps, newStep])
  }

  const handleDeleteStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i + 1 })))
  }

  const handleSaveStep = (updatedStep: WorkflowStep) => {
    setSteps(steps.map((s) => (s.id === updatedStep.id ? updatedStep : s)))
    setEditingStepId(null)
  }

  const handleSaveWorkflow = () => {
    if (!name.trim()) {
      alert('Please enter a workflow name')
      return
    }

    const updatedWorkflow: Workflow = {
      id: workflow?.id || `wf-${Date.now()}`,
      name,
      description,
      status,
      steps,
      createdAt: workflow?.createdAt || new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
    }

    onSave(updatedWorkflow)
  }

  if (editingStepId) {
    const step = steps.find((s) => s.id === editingStepId)
    if (step) {
      return (
        <StepEditor
          step={step}
          onSave={handleSaveStep}
          onCancel={() => setEditingStepId(null)}
        />
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workflow Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveWorkflow}>Save Workflow</Button>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Workflow Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter workflow name"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'draft' | 'archived')}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg text-foreground"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Workflow Steps</h3>
          <Button onClick={handleAddStep} variant="outline" className="gap-2" size="sm">
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
        </div>

        {steps.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No steps yet. Click &apos;Add Step&apos; to begin.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {steps.map((step) => (
              <Card key={step.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{step.name}</p>
                      <p className="text-xs text-muted-foreground">{step.fields.length} field(s)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingStepId(step.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStep(step.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
