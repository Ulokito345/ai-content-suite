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
    <Card className="glass-card hover-lift border-0 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <span className="text-lg">
                {getToolCategoryIcon(tool.category)}
              </span>
            </div>
            <CardTitle className="text-lg leading-tight text-white font-semibold">
              {tool.name}
            </CardTitle>
          </div>
          
          {tool.isNew && (
            <Badge className="bg-green-500/20 text-green-400 border-green-400/50 border backdrop-blur-md">
              <Star className="h-3 w-3 mr-1" />
              Nuevo
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {tool.description && (
          <p className="text-sm text-white/70 line-clamp-3 leading-relaxed">
            {tool.description}
          </p>
        )}

        {/* Category and Pricing */}
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/50 border-0 text-xs backdrop-blur-md">
            {tool.category}
          </Badge>
          
          {tool.pricing && (
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/50 border-0 text-xs backdrop-blur-md">
              {tool.pricing}
            </Badge>
          )}
        </div>

        {/* Features */}
        {tool.features && tool.features.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-white/80">Características:</div>
            <div className="flex flex-wrap gap-1">
              {tool.features.slice(0, 3).map((feature, index) => (
                <Badge 
                  key={index} 
                  className="text-xs bg-white/10 text-white/80 border-white/20 border backdrop-blur-md"
                >
                  {feature}
                </Badge>
              ))}
              {tool.features.length > 3 && (
                <Badge className="text-xs bg-white/5 text-white/60 border-white/20 border backdrop-blur-md">
                  +{tool.features.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Source video info */}
        {tool.video && (
          <div className="pt-3 border-t border-white/10">
            <div className="text-xs text-white/60 space-y-1">
              <div className="flex items-center space-x-1">
                <span className="text-white/40">Fuente:</span>
                <span className="text-white/70 font-medium">{tool.video.channel?.name || 'Canal desconocido'}</span>
              </div>
              <div className="line-clamp-1 text-white/60">{tool.video.title}</div>
              <div className="text-white/50">{formatDate(tool.video.publishedAt)}</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          {tool.url ? (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift"
            >
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visitar</span>
              </a>
            </Button>
          ) : (
            <div />
          )}

          <div className="text-xs text-white/40 font-medium">
            {formatDate(tool.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}