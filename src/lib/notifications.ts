// Utilidades para notificaciones push

export interface NotificationData {
  title: string
  body: string
  icon?: string
  badge?: string
  url?: string
  data?: any
}

export class NotificationService {
  private static instance: NotificationService
  private registration: ServiceWorkerRegistration | null = null

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push messaging is not supported')
      return false
    }

    try {
      // Registrar service worker
      this.registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered successfully')
      return true
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return false
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission === 'denied') {
      console.warn('Notifications are blocked by the user')
      return false
    }

    // Solicitar permiso
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  async showLocalNotification(data: NotificationData): Promise<void> {
    if (!await this.requestPermission()) {
      return
    }

    if (this.registration) {
      await this.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon || '/icon-192x192.png',
        badge: data.badge || '/icon-192x192.png',
        data: data.data,
        actions: [
          {
            action: 'view',
            title: 'Ver'
          },
          {
            action: 'dismiss',
            title: 'Descartar'
          }
        ]
      })
    } else {
      // Fallback a notificación nativa
      new Notification(data.title, {
        body: data.body,
        icon: data.icon || '/icon-192x192.png'
      })
    }
  }

  async subscribeToOneSignal(): Promise<string | null> {
    try {
      // Implementar OneSignal aquí si se decide usar
      // Por ahora usamos notificaciones locales
      return null
    } catch (error) {
      console.error('Error subscribing to OneSignal:', error)
      return null
    }
  }

  // Notificar sobre nueva herramienta importante
  async notifyNewTool(toolName: string, category: string, channelName: string): Promise<void> {
    await this.showLocalNotification({
      title: '🔧 Nueva herramienta de IA',
      body: `${toolName} (${category}) encontrada en ${channelName}`,
      data: {
        type: 'tool',
        url: '/tools'
      }
    })
  }

  // Notificar sobre noticia importante
  async notifyImportantNews(title: string, channelName: string): Promise<void> {
    await this.showLocalNotification({
      title: '📰 Noticia importante',
      body: `${title} - ${channelName}`,
      data: {
        type: 'news',
        url: '/'
      }
    })
  }

  // Notificar sobre video procesado
  async notifyVideoProcessed(videoTitle: string, channelName: string): Promise<void> {
    await this.showLocalNotification({
      title: '✅ Video procesado',
      body: `"${videoTitle}" de ${channelName} ha sido analizado`,
      data: {
        type: 'video',
        url: '/channels'
      }
    })
  }
}