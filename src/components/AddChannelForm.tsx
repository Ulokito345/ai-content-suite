'use client'

import { useState } from 'react'
import { Plus, Youtube } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddChannelFormProps {
  onChannelAdded?: () => void
}

export function AddChannelForm({ onChannelAdded }: AddChannelFormProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      setError('Por favor ingresa una URL del canal')
      return
    }

    if (!url.includes('youtube.com')) {
      setError('Por favor ingresa una URL válida de YouTube')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al agregar el canal')
      }

      setSuccess('Canal agregado exitosamente')
      setUrl('')
      
      // Llamar callback si existe
      if (onChannelAdded) {
        onChannelAdded()
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="p-2 bg-red-500/20 rounded-xl">
            <Youtube className="h-5 w-5 text-red-400" />
          </div>
          <span className="font-semibold">Agregar Canal</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="channel-url" className="text-sm font-medium text-white/90 block">
              URL del Canal de YouTube
            </label>
            <Input
              id="channel-url"
              type="url"
              placeholder="https://www.youtube.com/@canal o https://www.youtube.com/channel/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-blue-400/50"
            />
            <div className="text-xs text-white/60">
              Puedes usar cualquier formato de URL de YouTube (canal, @handle, /c/, /user/)
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-400/20 p-3 rounded-xl backdrop-blur-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-400 bg-green-500/10 border border-green-400/20 p-3 rounded-xl backdrop-blur-md">
              {success}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading || !url.trim()}
            className="w-full btn-apple hover-lift flex items-center space-x-2 h-12"
          >
            <Plus className="h-5 w-5" />
            <span>{isLoading ? 'Agregando...' : 'Agregar Canal'}</span>
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl backdrop-blur-md">
          <div className="text-sm">
            <div className="font-semibold mb-3 text-blue-400 flex items-center space-x-2">
              <span>✨</span>
              <span>Canales recomendados:</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {['@CreatorMagicAI', '@theAIsearch', '@AIJasonZ', '@curiousrefuge', '@DotCSVLab'].map((channel) => (
                <button
                  key={channel}
                  onClick={() => setUrl(`https://www.youtube.com/${channel}`)}
                  className="text-left text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  • {channel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}