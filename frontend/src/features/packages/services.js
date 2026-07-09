import api from '../../services/api.js'

export async function fetchPackages(params = {}) {
  const response = await api.get('/packages', { params })
  return response.data.data
}

export async function fetchPackage(id) {
  const response = await api.get(`/packages/${id}`)
  return response.data.data
}

export async function fetchPackageBySlug(slug) {
  const response = await api.get(`/packages/${slug}`)
  return response.data.data
}

export async function fetchAdminPackages(params = {}) {
  const response = await api.get('/packages/admin/packages', { params })
  return response.data.data
}

export async function createPackage(payload) {
  const response = await api.post('/packages/admin/packages', payload)
  return response.data.data
}

export async function updatePackage(id, payload) {
  const response = await api.patch(`/packages/admin/packages/${id}`, payload)
  return response.data.data
}

export async function deletePackage(id) {
  await api.delete(`/packages/admin/packages/${id}`)
}
