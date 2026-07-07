import { useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader.jsx'
import StatusBadge from '../../../components/common/StatusBadge.jsx'
import { formatCurrency, formatDate } from '../../../utils/format.js'
import { fetchPayments } from '../services.js'

function AdminPaymentsPage() {
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadPayments() {
      try {
        const result = await fetchPayments()
        if (isMounted) {
          setPayments(result || [])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPayments()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Payment tracking</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">Token payment records</h2>

      <div className="mt-6 grid gap-4">
        {isLoading ? (
          <Loader label="Loading payments" />
        ) : (
          payments.map((payment) => (
            <div
              key={payment.id}
              className="grid gap-4 rounded-[1.5rem] bg-white/75 p-5 lg:grid-cols-[1fr_0.9fr_0.8fr_0.7fr]"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900">{payment.customerName}</p>
                <p className="mt-1 text-sm text-slate-500">{payment.packageTitle || 'General payment'}</p>
                <p className="mt-3 text-sm text-slate-600">Transaction: {payment.transactionId}</p>
              </div>
              <div className="text-sm leading-7 text-slate-600">
                <p>{payment.phone}</p>
                <p>{formatDate(payment.createdAt)}</p>
              </div>
              <p className="text-xl font-bold text-cyan-800">{formatCurrency(payment.amount)}</p>
              <StatusBadge value={payment.paymentStatus} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminPaymentsPage
