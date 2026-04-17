'use client'

import { useState } from 'react'
import { dummyDocuments, Document, DocumentStatus } from '@/lib/document-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, Check, X, AlertCircle } from 'lucide-react'

export function DocumentsTable() {
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | DocumentStatus>('all')

  const filteredDocuments = documents.filter((d) => {
    const matchesSearch =
      d.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || d.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      case 'needs_revision':
        return 'bg-orange-100 text-orange-700'
    }
  }

  const handleApprove = (id: string) => {
    setDocuments(
      documents.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'approved',
              reviewedBy: 'user-001',
              reviewDate: new Date(),
              updatedAt: new Date(),
            }
          : d
      )
    )
  }

  const handleReject = (id: string) => {
    setDocuments(
      documents.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'rejected',
              reviewedBy: 'user-001',
              reviewDate: new Date(),
              remarks: 'Document rejected - see comments',
              updatedAt: new Date(),
            }
          : d
      )
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by candidate, document name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | DocumentStatus)}
            className="px-3 py-2 border border-border rounded-lg text-sm text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="needs_revision">Needs Revision</option>
          </select>

          <p className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
          </p>
        </div>
      </Card>

      <div className="grid gap-3">
        {filteredDocuments.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No documents found matching your search.</p>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{doc.name}</h4>
                    <span className="text-xs bg-secondary px-2 py-1 rounded text-foreground capitalize">
                      {doc.type}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{doc.candidateName}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground mb-0.5">File</p>
                      <p className="font-medium text-foreground truncate">{doc.fileName}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-0.5">Size</p>
                      <p className="font-medium text-foreground">{doc.size} MB</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-0.5">Uploaded</p>
                      <p className="font-medium text-foreground">
                        {doc.uploadedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-0.5">Status</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status === 'needs_revision' ? 'Needs Revision' : doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {doc.remarks && (
                    <div className="mt-2 p-2 bg-secondary rounded text-xs text-foreground">
                      <p className="font-medium mb-1">Remarks:</p>
                      <p>{doc.remarks}</p>
                    </div>
                  )}
                </div>

                {doc.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApprove(doc.id)}
                      className="gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(doc.id)}
                      className="gap-1 text-red-600 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    {doc.status === 'needs_revision' && (
                      <span className="text-xs font-medium text-orange-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Revision needed
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
