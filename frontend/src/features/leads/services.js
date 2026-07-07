import api from '../../services/api.js'

export async function createLead(payload) {
  const response = await api.post('/leads', payload)
  return response.data.data
}

export async function createPaymentOrder(payload) {
  const response = await api.post('/payments/order', payload)
  return response.data.data
}

export async function verifyPayment(payload) {
  const response = await api.post('/payments/verify', payload)
  return response.data.data
}
