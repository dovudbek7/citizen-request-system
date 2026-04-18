export type Locale = "uz" | "kr" | "ru" | "en"
export type Theme = "light" | "dark"
export type DirectoryType = "employees" | "organizations"
export type Availability = "online" | "offline"
export type MessageMode = "text" | "video" | "audio"
export type RingStatus = "pending" | "coming" | "busy" | "day_off"
export type FaqCategory =
  | "services"
  | "payments"
  | "security"
  | "working_hours"
  | "technical"

export type LocalizedText = Record<Locale, string>

export interface ApiResponse<T> {
  results?: T[]
  count?: number
  next?: string | null
  previous?: string | null
}

export interface ContactEntity {
  id: string
  type: DirectoryType
  name: LocalizedText
  title: LocalizedText
  description: LocalizedText
  department: LocalizedText
  availability: Availability
  workingHours: LocalizedText
  tags: LocalizedText[]
  avatar?: string
  phone?: string
}

export interface FaqItem {
  id: string
  category: FaqCategory
  question: LocalizedText
  answer: LocalizedText
}

export interface AnalyticsMetric {
  id: string
  label: LocalizedText
  today: number
  week: number
  month: number
  trend: number
}

export interface ServiceDemand {
  id: string
  label: LocalizedText
  requests: number
  completionRate: number
}

export interface SatisfactionPoint {
  label: string
  value: number
}

export interface HeatmapCell {
  day: string
  hour: string
  level: number
}

export interface LocationService {
  id: string
  region: LocalizedText
  service: LocalizedText
  distanceKm: number
  etaMinutes: number
  availability: Availability
}

export interface ComingSoonFeature {
  id: string
  title: LocalizedText
  description: LocalizedText
}

export interface TranslationDictionary {
  brand: {
    subtitle: string
  }
  nav: {
    home: string
    directory: string
    analytics: string
    faq: string
  }
  home: {
    badge: string
    titleLead: string
    titleAccent: string
    titleEnd: string
    description: string
    request: string
    faq: string
    statsLabel: string
    statsItems: string[]
    flowLabel: string
    flowSteps: string[]
  }
  request: {
    title: string
    description: string
    employees: string
    organizations: string
    enter: string
  }
  directory: {
    title: string
    employees: string
    organizations: string
    search: string
    all: string
    onlineOnly: string
    available: string
    unavailable: string
    workingHours: string
    textMessage: string
    videoMessage: string
    audioMessage: string
    sending: string
    noResults: string
    openProfile: string
    activeSelection: string
    messagePrompt: string
    messageSent: string
    messagePlaceholder: string
    videoPlaceholder: string
    attachVideo: string
    send: string
    ring: string
    ringing: string
    ringPending: string
    ringComing: string
    ringBusy: string
    ringDayOff: string
    ringTimeout: string
    leaveMessage: string
    senderNamePlaceholder: string
  }
  analytics: {
    title: string
    subtitle: string
    totalRequests: string
    activeUsers: string
    requestedServices: string
    weeklyReport: string
    monthlyReport: string
    satisfaction: string
    heatmap: string
    serviceDiscovery: string
    filterServices: string
    today: string
    week: string
    month: string
    averageRating: string
    usageTrend: string
    location: string
    eta: string
    distance: string
    comingSoon: string
    discoverPlaceholder: string
  }
  faq: {
    title: string
    description: string
    search: string
    all: string
    noResults: string
    contactPrompt: string
    categories: Record<"all" | FaqCategory, string>
    loading: string
  }
  rating: {
    title: string
    description: string
    placeholder: string
    submit: string
    thanks: string
  }
  recorder: {
    startRecording: string
    stopRecording: string
    recording: string
    retake: string
    sendVideo: string
    sendAudio: string
    playPrompt: string
    recordPrompt: string
    recordingAudio: string
    cameraError: string
    micError: string
  }
  common: {
    language: string
    theme: string
    light: string
    dark: string
    back: string
    close: string
    send: string
    retry: string
    online: string
    offline: string
    available: string
    comingSoonBadge: string
  }
}
