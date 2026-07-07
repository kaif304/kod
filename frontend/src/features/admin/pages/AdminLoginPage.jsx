import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../../components/common/FormField.jsx'
import useAuth from '../../../hooks/useAuth.js'

function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({
    email: 'admin@kodtravel.com',
    password: 'Admin@12345',
  })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await login(form)
      navigate('/admin/dashboard')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to login right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6efe4] px-4">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-lg rounded-[2rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
          Admin Login
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none text-slate-900">
          Welcome back to KOD.
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Login as admin or manager to manage packages, leads, and token payment tracking.
        </p>

        <div className="mt-6 grid gap-4">
          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <FormField
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in...' : 'Login to dashboard'}
        </button>

        {message ? <p className="mt-4 text-sm text-rose-700">{message}</p> : null}
      </form>
    </div>
  )
}

export default AdminLoginPage
