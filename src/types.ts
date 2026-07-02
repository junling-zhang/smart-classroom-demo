// Types
export interface Activity {
  id: string
  type: 'signin' | 'question' | 'discussion' | 'vote' | 'quiz' | 'brainstorm' | 'homework'
  title: string
  status: 'not_started' | 'ongoing' | 'ended' | 'archived'
  participantCount: number
  totalCount: number
  correctRate?: number
  duration?: number
  startTime?: string
}

export interface ChatMessage {
  id: string
  role: 'teacher' | 'ai'
  content: string
  timestamp: Date
  type?: 'text' | 'plan' | 'confirm' | 'result' | 'error'
  actions?: { label: string; action: string }[]
}

export interface CourseInfo {
  title: string
  className: string
  teacher: string
  totalStudents: number
  presentStudents: number
  participationRate: number
  phase: 'pre' | 'during' | 'post'
}

export interface Courseware {
  id: string
  title: string
  type: 'ppt' | 'pdf' | 'image' | 'video'
  currentPage: number
  totalPages: number
  url: string
}
