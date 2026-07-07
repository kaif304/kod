import api from '../../services/api.js'

export async function fetchPackages(params = {}, admin = false) {
  const endpoint = admin ? '/packages/admin/list' : '/packages'
  const response = await api.get(endpoint, { params })
  return response.data.data
}

export async function fetchPackageBySlug(slug) {
  const response = await api.get(`/packages/${slug}`)
  return response.data.data
}

export async function createPackage(payload) {
  const response = await api.post('/packages', payload)
  return response.data.data
}

export async function updatePackage(id, payload) {
  const response = await api.patch(`/packages/${id}`, payload)
  return response.data.data
}

export async function deletePackage(id) {
  await api.delete(`/packages/${id}`)
}
