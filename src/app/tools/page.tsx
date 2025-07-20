'use client'

import { useEffect, useState } from 'react'
import { Cpu, Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ToolCard } from '@/components/ToolCard'
import { Badge } from '@/components/ui/badge'
import { getToolCategoryIcon } from '@/lib/utils'
import type { Tool, ToolCategory } from '@/types'

const TOOL_CATEGORIES = [
  'VIDEO', 'IMAGE', 'TEXT', 'AUDIO', 'CODE', 'DATA', 'DESIGN', 'PRODUCTIVITY', 'OTHER'
] as const

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [showOnlyNew, setShowOnlyNew] = useState(false)

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools')
      if (response.ok) {
        const toolsData = await response.json()
        setTools(toolsData)
      }
    } catch (error) {
      console.error('Error fetching tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === 'ALL' || tool.category === selectedCategory
    const newMatch = !showOnlyNew || tool.isNew
    return categoryMatch && newMatch
  })

  const toolCounts = TOOL_CATEGORIES.reduce((acc, category) => {
    acc[category] = tools.filter(tool => tool.category === category).length
    return acc
  }, {} as Record<string, number>)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Herramientas de IA</h1>
        <p className="text-gray-600 mt-2">
          Descubre las últimas herramientas de inteligencia artificial
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{tools.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {tools.filter(t => t.isNew).length}
            </div>
            <div className="text-sm text-gray-600">Nuevas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {tools.filter(t => t.url).length}
            </div>
            <div className="text-sm text-gray-600">Con enlaces</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {TOOL_CATEGORIES.length}
            </div>
            <div className="text-sm text-gray-600">Categorías</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filtros:</span>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === 'ALL' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory('ALL')}
          >
            Todas ({tools.length})
          </Badge>
          
          {TOOL_CATEGORIES.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {getToolCategoryIcon(category)} {category} ({toolCounts[category]})
            </Badge>
          ))}
        </div>

        {/* Additional filters */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={showOnlyNew ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setShowOnlyNew(!showOnlyNew)}
          >
            ⭐ Solo nuevas ({tools.filter(t => t.isNew).length})
          </Badge>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : tools.length > 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            <Cpu className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No hay herramientas con estos filtros</h3>
            <p>Intenta cambiar los filtros o agregar más canales</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory('ALL')
                setShowOnlyNew(false)
              }}
            >
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            <Cpu className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No hay herramientas disponibles</h3>
            <p>Agrega canales y procesa videos para ver herramientas aquí</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}