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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Youtube className="h-5 w-5 text-red-600" />
          <span>Agregar Canal</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="channel-url" className="text-sm font-medium">
              URL del Canal de YouTube
            </label>
            <Input
              id="channel-url"
              type="url"
              placeholder="https://www.youtube.com/@canal o https://www.youtube.com/channel/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <div className="text-xs text-gray-500">
              Puedes usar cualquier formato de URL de YouTube (canal, @handle, /c/, /user/)
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
              {success}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading || !url.trim()}
            className="w-full flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{isLoading ? 'Agregando...' : 'Agregar Canal'}</span>
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-1">Canales recomendados:</div>
            <div className="text-xs space-y-1">
              <div>• @CreatorMagicAI</div>
              <div>• @theAIsearch</div>
              <div>• @AIJasonZ</div>
              <div>• @curiousrefuge</div>
              <div>• @DotCSVLab</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}