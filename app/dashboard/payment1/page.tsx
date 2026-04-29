'use client'

import { useState } from 'react'
import { StudentLayout } from '@/components/student/student-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dummyStudentProfile } from '@/lib/student-profile'
import { CreditCard, Copy, Lock } from 'lucide-react'

export default function PaymentPage() {
  const [copied, setCopied] = useState(false)

  const bankDetails = {
    accountName: 'International Education Corp',
    accountNumber: '1234567890',
    ifsc: 'ICIC0000001',
    bankName: 'ICICI Bank',
    amount: '₹50,000',
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <StudentLayout currentStep={dummyStudentProfile.currentWorkflowStep}>
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">First Payment</h1>
          <p className="text-muted-foreground">Complete your payment to secure your internship position</p>
        </div>

        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">This step is currently locked</p>
              <p className="text-sm text-red-800 mt-1">
                Complete your interview and get selected first to unlock payment
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Internship Fee</span>
              <span className="font-semibold text-foreground">₹50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="font-semibold text-foreground">₹9,000</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total Amount</span>
              <span className="text-lg font-bold text-primary">₹59,000</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Bank Transfer Details
          </h2>
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Account Name</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={bankDetails.accountName}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-border rounded text-foreground text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(bankDetails.accountName)}
                  className="gap-1"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Account Number</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-border rounded text-foreground text-sm font-mono"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(bankDetails.accountNumber)}
                  className="gap-1"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">IFSC Code</label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={bankDetails.ifsc}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-border rounded text-foreground text-sm font-mono"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(bankDetails.ifsc)}
                    className="gap-1"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  readOnly
                  className="w-full px-3 py-2 mt-2 bg-white border border-border rounded text-foreground text-sm"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Upload</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              After making the payment, upload a screenshot of the transaction confirmation
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <p className="font-medium text-foreground mb-2">Upload Payment Screenshot</p>
              <Button variant="outline" className="gap-2">
                Choose File
              </Button>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground">Transaction ID</label>
              <Input placeholder="Enter transaction ID" className="mt-2" disabled />
            </div>
          </div>
        </Card>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Note:</span> Once payment is confirmed, you will receive a payment receipt via email. 
            Please keep it for your records.
          </p>
        </div>

        <Button className="w-full" disabled>
          Make Payment (Locked)
        </Button>
      </div>
    </StudentLayout>
  )
}
