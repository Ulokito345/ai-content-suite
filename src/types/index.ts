// Tipos para la aplicación
export interface Channel {
  id: string
  name: string
  channelId: string
  url: string
  description?: string
  language: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  videos?: Video[]
}

export interface Video {
  id: string
  videoId: string
  title: string
  description?: string
  url: string
  duration?: string
  publishedAt: Date
  thumbnail?: string
  transcriptRaw?: string
  transcriptClean?: string
  summary?: string
  category: Category
  priority: Priority
  isProcessed: boolean
  channelId: string
  channel?: Channel
  tools?: Tool[]
  news?: NewsItem[]
}

export interface Tool {
  id: string
  name: string
  description?: string
  category: ToolCategory
  url?: string
  pricing?: string
  features: string[]
  isNew: boolean
  isNotified: boolean
  videoId: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  importance: Priority
  isNotified: boolean
  videoId: string
}

export enum Category {
  TOOLS = 'TOOLS',
  NEWS = 'NEWS',
  TUTORIAL = 'TUTORIAL',
  RESEARCH = 'RESEARCH',
  STARTUP = 'STARTUP',
  UNCATEGORIZED = 'UNCATEGORIZED'
}

export enum ToolCategory {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  CODE = 'CODE',
  DATA = 'DATA',
  DESIGN = 'DESIGN',
  PRODUCTIVITY = 'PRODUCTIVITY',
  OTHER = 'OTHER'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum QueueStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

// Tipos para el API de YouTube
export interface YouTubeChannelInfo {
  id: string
  title: string
  description: string
  customUrl?: string
  thumbnails: {
    default: { url: string }
    medium: { url: string }
    high: { url: string }
  }
}

export interface YouTubeVideoInfo {
  id: string
  title: string
  description: string
  publishedAt: string
  duration: string
  thumbnails: {
    medium: { url: string }
    high: { url: string }
  }
}

// Tipos para procesamiento con LLM
export interface ContentAnalysis {
  category: Category
  priority: Priority
  summary: string
  tools?: {
    name: string
    description: string
    category: ToolCategory
    url?: string
    pricing?: string
    features: string[]
  }[]
  news?: {
    title: string
    summary: string
    importance: Priority
  }[]
}

// Tipos para notificaciones
export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  data?: {
    url?: string
    videoId?: string
    type: 'tool' | 'news' | 'video'
  }
}