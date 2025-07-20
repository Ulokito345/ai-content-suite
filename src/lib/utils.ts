import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatDuration(duration: string): string {
  // Convertir formato ISO 8601 (PT4M13S) a formato legible (4:13)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return duration

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    TOOLS: '🔧',
    NEWS: '📰',
    TUTORIAL: '📚',
    RESEARCH: '🔬',
    STARTUP: '💼',
    UNCATEGORIZED: '📄'
  }
  return icons[category] || '📄'
}

export function getToolCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    VIDEO: '🎥',
    IMAGE: '🖼️',
    TEXT: '📝',
    AUDIO: '🎵',
    CODE: '💻',
    DATA: '📊',
    DESIGN: '🎨',
    PRODUCTIVITY: '⚡',
    OTHER: '🔗'
  }
  return icons[category] || '🔗'
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    LOW: 'text-gray-500',
    MEDIUM: 'text-blue-500',
    HIGH: 'text-orange-500',
    CRITICAL: 'text-red-500'
  }
  return colors[priority] || 'text-gray-500'
}

export function getPriorityBadgeColor(priority: string): string {
  const colors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-orange-100 text-orange-800',
    CRITICAL: 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}