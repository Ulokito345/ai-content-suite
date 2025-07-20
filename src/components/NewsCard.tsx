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
    <Card className={`group hover:shadow-lg transition-shadow duration-200 ${
      isPriority ? 'ring-2 ring-orange-200' : ''
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight flex items-center space-x-2">
            {isPriority && (
              <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
            )}
            <span className="line-clamp-2">{news.title}</span>
          </CardTitle>
          
          <Badge className={getPriorityBadgeColor(news.importance)}>
            {news.importance}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary */}
        <p className="text-sm text-gray-600 line-clamp-4">
          {news.summary}
        </p>

        {/* Source video info */}
        {news.video && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Fuente: {news.video.channel?.name || 'Canal desconocido'}</div>
              <div className="line-clamp-1">{news.video.title}</div>
              <div>{formatDate(news.video.publishedAt)}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {news.video?.url && (
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a 
                href={news.video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Ver video</span>
              </a>
            </Button>
          )}

          <div className="text-xs text-gray-400">
            {formatDate(news.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}