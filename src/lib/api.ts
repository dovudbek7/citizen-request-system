const API_BASE = "https://watercrm.pythonanywhere.com/api/v1"
// const API_BASE = "http://127.0.0.1:8000/api/v1"

export const API_ENDPOINTS = {
  visits: {
    create: () => `${API_BASE}/visits/`,
  },
  serviceRequests: {
    create: () => `${API_BASE}/service-requests/`,
  },
  targets: {
    list: (lang: string) => `${API_BASE}/targets/?lang=${lang}`,
    detail: (id: string, lang: string) => `${API_BASE}/targets/${id}?lang=${lang}`,
    ring: () => `${API_BASE}/targets/ring/`,
    ringStatus: (ringId: string) => `${API_BASE}/targets/ring/${ringId}/status/`,
  },
  messages: {
    send: () => `${API_BASE}/messages/`,
  },
  faqs: {
    list: (lang: string) => `${API_BASE}/faqs?lang=${lang}`,
  },
} as const
