'use client'

import { useState } from 'react'
import { dummyCandidates, Candidate, CandidateStatus, PaymentStatus } from '@/lib/candidate-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, ArrowRight, MessageSquare, Check, X, ChevronRight, Phone, Mail } from 'lucide-react'

export function CandidatesTable() {
  const [candidates, setCandidates] = useState<Candidate[]>(dummyCandidates)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | CandidateStatus>('all')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [showMoveStep, setShowMoveStep] = useState(false)

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.program.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || c.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: CandidateStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
    }
  }

  const getPaymentColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700'
      case 'unpaid':
        return 'bg-orange-50 text-orange-700'
      case 'overdue':
        return 'bg-red-50 text-red-700'
    }
  }

  const handleStatusChange = (id: string, newStatus: CandidateStatus) => {
    setCandidates(
      candidates.map((c) =>
        c.id === id ? { ...c, status: newStatus, updatedAt: new Date() } : c
      )
    )
  }

  const handleMoveStep = (newStep: string) => {
    if (selectedCandidate) {
      setCandidates(
        candidates.map((c) =>
          c.id === selectedCandidate.id
            ? { ...c, currentStep: newStep, updatedAt: new Date() }
            : c
        )
      )
      setShowMoveStep(false)
    }
  }

  const handleAddNotes = () => {
    if (selectedCandidate && notes) {
      setCandidates(
        candidates.map((c) =>
          c.id === selectedCandidate.id
            ? { ...c, notes: notes, updatedAt: new Date() }
            : c
        )
      )
      setNotes('')
      setShowNotes(false)
    }
  }

  // Modal: View Candidate Details
  if (selectedCandidate && !showNotes && !showMoveStep) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{selectedCandidate.name}</h2>
              <p className="text-muted-foreground mt-1">{selectedCandidate.program}</p>
            </div>
            <Button variant="ghost" onClick={() => setSelectedCandidate(null)}>
              ✕
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${selectedCandidate.email}`} className="text-foreground hover:underline">
                    {selectedCandidate.email}
                  </a>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Phone</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <p className="text-foreground">{selectedCandidate.phone || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Current Step</label>
                <p className="font-semibold text-foreground mt-1">{selectedCandidate.currentStep}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedCandidate.status)}`}>
                  {selectedCandidate.status.charAt(0).toUpperCase() + selectedCandidate.status.slice(1)}
                </span>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Payment</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPaymentColor(selectedCandidate.paymentStatus)}`}>
                  {selectedCandidate.paymentStatus.charAt(0).toUpperCase() +
                    selectedCandidate.paymentStatus.slice(1).replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {selectedCandidate.notes && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Notes</label>
                <p className="text-foreground mt-2 p-3 bg-secondary rounded-lg">{selectedCandidate.notes}</p>
              </div>
            )}

            <div className="flex gap-2 border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={() => setShowMoveStep(true)}
                className="gap-2 flex-1"
              >
                <ArrowRight className="w-4 h-4" />
                Move to Step
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNotes(true)}
                className="gap-2 flex-1"
              >
                <MessageSquare className="w-4 h-4" />
                Add Notes
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedCandidate(null)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Modal: Add Notes
  if (selectedCandidate && showNotes) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Add Notes for {selectedCandidate.name}</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
            className="w-full h-32 p-3 border border-border rounded-lg text-foreground bg-background mb-4"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowNotes(false)
                setNotes('')
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleAddNotes} disabled={!notes.trim()} className="flex-1">
              Save Notes
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Modal: Move to Step
  if (selectedCandidate && showMoveStep) {
    const steps = ['Application Review', 'Initial Screening', 'Technical Interview', 'HR Round', 'Offer Stage']
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Move to Step</h2>
          <div className="space-y-2 mb-4">
            {steps.map((step) => (
              <Button
                key={step}
                variant={selectedCandidate.currentStep === step ? 'default' : 'outline'}
                className="w-full justify-start gap-2"
                onClick={() => handleMoveStep(step)}
              >
                {selectedCandidate.currentStep === step && <Check className="w-4 h-4" />}
                {step}
              </Button>
            ))}
          </div>
          <Button variant="outline" onClick={() => setShowMoveStep(false)} className="w-full">
            Cancel
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | CandidateStatus)}
            className="px-3 py-2 border border-border rounded-lg text-sm text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}
          </p>
        </div>
      </Card>

      <div className="grid gap-3">
        {filteredCandidates.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No candidates found matching your search.</p>
          </Card>
        ) : (
          filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                    <p className="text-xs text-muted-foreground">{candidate.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() =>
                        handleStatusChange(
                          candidate.id,
                          candidate.status === 'approved' ? 'pending' : 'approved'
                        )
                      }
                    >
                      {candidate.status === 'approved' ? (
                        <>
                          <Check className="w-3 h-3" />
                          Approved
                        </>
                      ) : (
                        <>
                          <Check className="w-3 h-3" />
                          Approve
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-red-600 hover:text-red-700"
                      onClick={() => handleStatusChange(candidate.id, 'rejected')}
                    >
                      <X className="w-3 h-3" />
                      Reject
                    </Button>
                  </div>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Program</p>
                    <p className="font-medium text-foreground truncate">{candidate.program}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-1">Current Step</p>
                    <p className="font-medium text-foreground truncate">{candidate.currentStep}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-1">Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </span>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-1">Payment</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(candidate.paymentStatus)}`}>
                      {candidate.paymentStatus.charAt(0).toUpperCase() +
                        candidate.paymentStatus.slice(1).replace(/_/g, ' ')}
                    </span>
                  </div>

                  {candidate.interviewDate && (
                    <div>
                      <p className="text-muted-foreground mb-1">Interview</p>
                      <p className="font-medium text-foreground">
                        {candidate.interviewDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action row */}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-xs"
                    onClick={() => {
                      setSelectedCandidate(candidate)
                      setShowMoveStep(true)
                    }}
                  >
                    <ArrowRight className="w-3 h-3" />
                    Move to Step
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-xs"
                    onClick={() => {
                      setSelectedCandidate(candidate)
                      setShowNotes(true)
                    }}
                  >
                    <MessageSquare className="w-3 h-3" />
                    Add Notes
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
