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
    <Card className="glass-card hover-lift border-0 group">
      <CardHeader className="p-0">
        <div className="relative aspect-video rounded-t-2xl overflow-hidden">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <Play className="h-12 w-12 text-white/50" />
            </div>
          )}
          
          {/* Overlay with duration */}
          {video.duration && (
            <div className="absolute bottom-3 right-3 glass px-3 py-1 rounded-full text-xs flex items-center space-x-2">
              <Clock className="h-3 w-3 text-white/90" />
              <span className="text-white/90 font-medium">{formatDuration(video.duration)}</span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge className="glass border-0 text-white/90 backdrop-blur-md">
              {getCategoryIcon(video.category)} {video.category}
            </Badge>
          </div>

          {/* Priority badge */}
          {video.priority !== 'MEDIUM' && (
            <div className="absolute top-3 right-3">
              <Badge className={`${getPriorityBadgeColor(video.priority)} border-0 backdrop-blur-md`}>
                {video.priority}
              </Badge>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Channel name */}
          <div className="text-sm text-white/60 font-medium">
            {video.channel?.name || 'Canal desconocido'}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-white line-clamp-2 leading-tight text-lg">
            {video.title}
          </h3>

          {/* Summary if available */}
          {video.summary && (
            <p className="text-sm text-white/70 line-clamp-3 leading-relaxed">
              {video.summary}
            </p>
          )}

          {/* Tools and news count */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex space-x-4">
              {video.tools && video.tools.length > 0 && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 rounded-full">
                  <span className="text-blue-400">🔧</span>
                  <span className="text-white/80">{video.tools.length}</span>
                </div>
              )}
              {video.news && video.news.length > 0 && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 rounded-full">
                  <span className="text-green-400">📰</span>
                  <span className="text-white/80">{video.news.length}</span>
                </div>
              )}
            </div>
            <span className="text-white/50 font-medium">{formatDate(video.publishedAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift"
            >
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ver video</span>
              </a>
            </Button>

            {showProcessButton && !video.isProcessed && (
              <Button
                size="sm"
                onClick={handleProcess}
                disabled={isProcessing}
                className="btn-apple hover-lift flex items-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>{isProcessing ? 'Procesando...' : 'Procesar'}</span>
              </Button>
            )}

            {video.isProcessed && (
              <Badge className="bg-green-500/20 border-green-400/50 text-green-400 border backdrop-blur-md">
                ✓ Procesado
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}