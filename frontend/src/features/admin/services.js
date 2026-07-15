import api from '../../services/api.js'
import {
  createPackage,
  deletePackage,
  fetchPackages,
  fetchAdminPackages,
  updatePackage,
} from '../packages/services.js'

export async function loginAdmin(credentials) {
  const response = await api.post('/auth/login', credentials)
  return response.data.data
}

export async function fetchDashboardOverview() {
  const response = await api.get('/dashboard/overview')
  return response.data.data
}

export async function fetchAllPackages(params = {}) {
  return fetchAdminPackages(params, true)
}

export async function savePackage(payload, packageId) {
  if (packageId) {
    return updatePackage(packageId, payload)
  }

  return createPackage(payload)
}

export async function removePackage(packageId) {
  return deletePackage(packageId)
}

export async function fetchLeads(params = {}) {
  const response = await api.get('/leads', { params })
  return response.data.data
}

export async function updateLeadStatus(id, status) {
  const response = await api.patch(`/leads/${id}/status`, { status })
  return response.data.data
}

export async function fetchPayments() {
  const response = await api.get('/payments')
  return response.data.data
}
