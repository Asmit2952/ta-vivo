import { axiosInstance } from 'boot/axios'

export function fetchAll(context, queryString) {
  return axiosInstance.get(`/checks${queryString || ''}`)
}

export function fetch(context, payload) {
  return axiosInstance.get(`/checks/${payload.id}`)
}

export function fetchLogsById(context, payload) {
  return axiosInstance.get(`/checks/${payload.id}/logs${payload.query}`)
}

export function create(context, payload) {
  return axiosInstance.post('/checks', payload)
}

export function update(context, payload) {
  return axiosInstance.put(`/checks/${payload.id}`, payload)
}

export function disable(context, id) {
  return axiosInstance.put(`/checks/${id}/disable`)
}

export function enable(context, id) {
  return axiosInstance.put(`/checks/${id}/enable`)
}

export function remove (context, payload) {
  return axiosInstance.delete(`/checks/${payload.id}`)
}
