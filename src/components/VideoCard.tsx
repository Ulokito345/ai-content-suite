'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, Clock, ExternalLink, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatDuration, getCategoryIcon, getPriorityBadgeColor } from '@/lib/utils'
import type { Video } from '@/types'

interface VideoCardProps {
  video: Video
  onProcess?: (videoId: string) => void
  showProcessButton?: boolean
}

export function VideoCard({ video, onProcess, showProcessButton = false }: VideoCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcess = async () => {
    if (!onProcess) return
    
    setIsProcessing(true)
    try {
      await onProcess(video.videoId)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative aspect-video rounded-t-lg overflow-hidden">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Play className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Overlay with duration */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDuration(video.duration)}</span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {getCategoryIcon(video.category)} {video.category}
            </Badge>
          </div>

          {/* Priority badge */}
          {video.priority !== 'MEDIUM' && (
            <div className="absolute top-2 right-2">
              <Badge className={getPriorityBadgeColor(video.priority)}>
                {video.priority}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Channel name */}
          <div className="text-sm text-gray-600">
            {video.channel?.name || 'Canal desconocido'}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
            {video.title}
          </h3>

          {/* Summary if available */}
          {video.summary && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {video.summary}
            </p>
          )}

          {/* Tools and news count */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex space-x-3">
              {video.tools && video.tools.length > 0 && (
                <span>🔧 {video.tools.length} herramientas</span>
              )}
              {video.news && video.news.length > 0 && (
                <span>📰 {video.news.length} noticias</span>
              )}
            </div>
            <span>{formatDate(video.publishedAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Ver video</span>
              </a>
            </Button>

            {showProcessButton && !video.isProcessed && (
              <Button
                size="sm"
                onClick={handleProcess}
                disabled={isProcessing}
                className="flex items-center space-x-1"
              >
                <Zap className="h-3 w-3" />
                <span>{isProcessing ? 'Procesando...' : 'Procesar'}</span>
              </Button>
            )}

            {video.isProcessed && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                ✓ Procesado
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}