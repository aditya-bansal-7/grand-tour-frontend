'use client'

import { useState } from 'react'
import { WorkflowStep, WorkflowField, FieldType } from '@/lib/workflow-schema'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, GripVertical, Settings2, Check, X } from 'lucide-react'

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'date', label: 'Date Picker' },
  { value: 'number', label: 'Number Input' },
  { value: 'file', label: 'File Upload' },
  { value: 'section', label: 'Section Title' },
]

interface StepEditorProps {
  step: WorkflowStep
  onSave: (step: WorkflowStep) => void
  onCancel: () => void
}

export function StepEditor({ step, onSave, onCancel }: StepEditorProps) {
  const [name, setName] = useState(step.name)
  const [description, setDescription] = useState(step.description || '')
  const [deadline, setDeadline] = useState(step.deadline?.toString() || '')
  const [roleAssignment, setRoleAssignment] = useState(step.roleAssignment || '')
  const [triggerEmail, setTriggerEmail] = useState(step.triggerEmail || false)
  const [fields, setFields] = useState<WorkflowField[]>(step.fields)
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)

  const handleAddField = (type: FieldType) => {
    const newField: WorkflowField = {
      id: `field-${Date.now()}`,
      type,
      name: `New ${type} field`,
      required: false,
      order: fields.length + 1,
    }
    setFields([...fields, newField])
    setEditingFieldId(newField.id)
  }

  const handleDeleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id).map((f, i) => ({ ...f, order: i + 1 })))
  }

  const handleUpdateField = (id: string, updates: Partial<WorkflowField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a step name')
      return
    }

    const updatedStep: WorkflowStep = {
      ...step,
      name,
      description,
      deadline: deadline ? parseInt(deadline) : undefined,
      roleAssignment,
      triggerEmail,
      fields,
    }

    onSave(updatedStep)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Step</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Step</Button>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Step Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter step name"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional step description"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Deadline (days)</label>
            <Input
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="0"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Role Assignment</label>
            <Input
              value={roleAssignment}
              onChange={(e) => setRoleAssignment(e.target.value)}
              placeholder="e.g., Sales Manager"
              className="mt-1"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={triggerEmail}
            onChange={(e) => setTriggerEmail(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm font-medium text-foreground">Send email notification on completion</span>
        </label>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Fields</h3>
          <div className="flex gap-2 flex-wrap justify-end">
            {FIELD_TYPES.slice(0, 5).map((type) => (
              <Button
                key={type.value}
                variant="outline"
                size="sm"
                onClick={() => handleAddField(type.value)}
                className="text-xs"
              >
                + {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {FIELD_TYPES.slice(5).map((type) => (
            <Button
              key={type.value}
              variant="outline"
              size="sm"
              onClick={() => handleAddField(type.value)}
              className="text-xs"
            >
              + {type.label}
            </Button>
          ))}
        </div>

        {fields.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <p className="text-muted-foreground">No fields yet. Click a field type to add one.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {fields.map((field) => (
              <Card key={field.id} className={`p-4 transition-all ${editingFieldId === field.id ? 'ring-2 ring-primary border-transparent' : ''}`}>
                {editingFieldId === field.id ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">Editing {field.type} Field</span>
                      <Button variant="ghost" size="sm" onClick={() => setEditingFieldId(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Field Label</label>
                        <Input
                          value={field.name}
                          onChange={(e) => handleUpdateField(field.id, { name: e.target.value })}
                          placeholder="e.g., Full Name"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => handleUpdateField(field.id, { required: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm font-medium">Required</span>
                        </label>
                        
                        {(field.type === 'select' || field.type === 'radio') && (
                          <div className="flex-1">
                            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Options (comma separated)</label>
                            <Input
                              value={field.options?.join(', ') || ''}
                              onChange={(e) => handleUpdateField(field.id, { options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                              placeholder="Option 1, Option 2, Option 3"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Placeholder (optional)</label>
                        <Input
                          value={field.placeholder || ''}
                          onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
                          placeholder="Enter placeholder text"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="secondary" size="sm" onClick={() => setEditingFieldId(null)}>
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">{field.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold uppercase bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                            {field.type}
                          </span>
                          {field.required && (
                            <span className="text-[10px] font-bold uppercase bg-red-50 px-1.5 py-0.5 rounded text-red-600 border border-red-100">
                              Required
                            </span>
                          )}
                          {field.placeholder && (
                            <span className="text-[10px] text-muted-foreground italic">
                              &ldquo;{field.placeholder}&rdquo;
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingFieldId(field.id)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteField(field.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
