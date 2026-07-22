const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint) {
  const path = endpoint.startsWith('/api/') ? endpoint : `/api/${endpoint}/`
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  const collection = payload.results ?? payload.data ?? payload.items ?? payload.docs ?? []
  return Array.isArray(collection) ? collection : []
}