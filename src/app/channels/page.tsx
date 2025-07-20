'use client'

import { useEffect, useState } from 'react'
import { Youtube, Play, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AddChannelForm } from '@/components/AddChannelForm'
import { VideoCard } from '@/components/VideoCard'
import type { Channel } from '@/types'

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [processingVideos, setProcessingVideos] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchChannels()
  }, [])

  const fetchChannels = async () => {
    try {
      const response = await fetch('/api/channels')
      if (response.ok) {
        const channelsData = await response.json()
        setChannels(channelsData)
      }
    } catch (error) {
      console.error('Error fetching channels:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChannelAdded = () => {
    fetchChannels()
  }

  const handleProcessVideo = async (videoId: string) => {
    setProcessingVideos(prev => new Set(prev).add(videoId))
    
    try {
      const response = await fetch('/api/videos/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId })
      })

      if (response.ok) {
        // Actualizar la lista de canales para reflejar el cambio
        await fetchChannels()
      }
    } catch (error) {
      console.error('Error processing video:', error)
    } finally {
      setProcessingVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(videoId)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="lg:col-span-2 h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Canales</h1>
        <p className="text-gray-600 mt-2">
          Gestiona tus canales de YouTube favoritos de IA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Channel Form */}
        <div className="lg:col-span-1">
          <AddChannelForm onChannelAdded={handleChannelAdded} />
        </div>

        {/* Channels List */}
        <div className="lg:col-span-2 space-y-6">
          {channels.length > 0 ? (
            channels.map((channel) => (
              <Card key={channel.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Youtube className="h-6 w-6 text-red-600" />
                      <div>
                        <div className="text-lg">{channel.name}</div>
                        <div className="text-sm text-gray-500 font-normal">
                          {channel.language === 'es' ? '🇪🇸' : '🇺🇸'} {channel.language}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a 
                        href={channel.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1"
                      >
                        <Play className="h-3 w-3" />
                        <span>Ver canal</span>
                      </a>
                    </Button>
                  </CardTitle>
                  
                  {channel.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {channel.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent>
                  {/* Videos del canal */}
                  {channel.videos && channel.videos.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                          Videos Recientes ({channel.videos.length})
                        </h3>
                        
                        {/* Process all unprocessed videos */}
                        {channel.videos.some(video => !video.isProcessed) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              channel.videos?.forEach(video => {
                                if (!video.isProcessed) {
                                  handleProcessVideo(video.videoId)
                                }
                              })
                            }}
                            className="flex items-center space-x-1"
                          >
                            <Zap className="h-3 w-3" />
                            <span>Procesar todos</span>
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {channel.videos.map((video) => (
                          <VideoCard
                            key={video.id}
                            video={video}
                            onProcess={handleProcessVideo}
                            showProcessButton={true}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Youtube className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No hay videos disponibles para este canal</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <Youtube className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No hay canales agregados</h3>
                <p>Agrega tu primer canal usando el formulario de la izquierda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}