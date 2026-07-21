import api from '../../services/api.js'

export async function fetchPackages(params = {}) {
  const response = await api.get('/packages', { params })
  return response.data.data
}

export async function fetchPackageBySlug(slug) {
  const response = await api.get(`/packages/${slug}`)
  return response.data.data
}

