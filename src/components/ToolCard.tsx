'use client'

import { ExternalLink, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getToolCategoryIcon, formatDate } from '@/lib/utils'
import type { Tool } from '@/types'

interface ToolCardProps {
  tool: Tool & {
    video?: {
      channel?: {
        name: string
      }
      title: string
      publishedAt: Date
    }
  }
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {getToolCategoryIcon(tool.category)}
            </span>
            <CardTitle className="text-lg leading-tight">
              {tool.name}
            </CardTitle>
          </div>
          
          {tool.isNew && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Star className="h-3 w-3 mr-1" />
              Nuevo
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {tool.description && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {tool.description}
          </p>
        )}

        {/* Category */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {tool.category}
          </Badge>
          
          {/* Pricing */}
          {tool.pricing && (
            <Badge variant="secondary" className="text-xs">
              {tool.pricing}
            </Badge>
          )}
        </div>

        {/* Features */}
        {tool.features && tool.features.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-700">Características:</div>
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  {feature}
                </Badge>
              ))}
              {tool.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.features.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Source video info */}
        {tool.video && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Fuente: {tool.video.channel?.name || 'Canal desconocido'}</div>
              <div className="line-clamp-1">{tool.video.title}</div>
              <div>{formatDate(tool.video.publishedAt)}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {tool.url ? (
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Visitar</span>
              </a>
            </Button>
          ) : (
            <div />
          )}

          <div className="text-xs text-gray-400">
            {formatDate(tool.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}