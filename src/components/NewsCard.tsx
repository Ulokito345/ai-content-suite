'use client'

import { AlertCircle, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getPriorityBadgeColor, formatDate } from '@/lib/utils'
import type { NewsItem } from '@/types'

interface NewsCardProps {
  news: NewsItem & {
    video?: {
      channel?: {
        name: string
      }
      title: string
      url: string
      publishedAt: Date
    }
  }
}

export function NewsCard({ news }: NewsCardProps) {
  const isPriority = news.importance === 'HIGH' || news.importance === 'CRITICAL'

  return (
    <Card className={`glass-card hover-lift border-0 group relative ${
      isPriority ? 'ring-2 ring-orange-400/50' : ''
    }`}>
      {/* Priority indicator glow */}
      {isPriority && (
        <div className="absolute inset-0 bg-orange-500/5 rounded-2xl blur-sm"></div>
      )}
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight flex items-center space-x-3 text-white font-semibold">
            {isPriority && (
              <div className="p-1 bg-orange-500/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-orange-400 flex-shrink-0" />
              </div>
            )}
            <span className="line-clamp-2">{news.title}</span>
          </CardTitle>
          
          <Badge className={`${getPriorityBadgeColor(news.importance)} border-0 backdrop-blur-md ml-2`}>
            {news.importance}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        {/* Summary */}
        <p className="text-sm text-white/70 line-clamp-4 leading-relaxed">
          {news.summary}
        </p>

        {/* Source video info */}
        {news.video && (
          <div className="pt-3 border-t border-white/10">
            <div className="text-xs text-white/60 space-y-1">
              <div className="flex items-center space-x-1">
                <span className="text-white/40">Fuente:</span>
                <span className="text-white/70 font-medium">{news.video.channel?.name || 'Canal desconocido'}</span>
              </div>
              <div className="line-clamp-1 text-white/60">{news.video.title}</div>
              <div className="text-white/50">{formatDate(news.video.publishedAt)}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          {news.video?.url ? (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift"
            >
              <a 
                href={news.video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ver video</span>
              </a>
            </Button>
          ) : (
            <div />
          )}

          <div className="text-xs text-white/40 font-medium">
            {formatDate(news.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}