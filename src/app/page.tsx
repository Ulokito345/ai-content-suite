'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Youtube, Cpu, Newspaper, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VideoCard } from '@/components/VideoCard'
import { ToolCard } from '@/components/ToolCard'
import { NewsCard } from '@/components/NewsCard'

interface DashboardData {
  stats: {
    totalChannels: number
    totalVideos: number
    processedVideos: number
    totalTools: number
    newTools: number
    totalNews: number
    highPriorityNews: number
  }
  recentTools: any[]
  recentNews: any[]
  recentVideos: any[]
  toolsByCategory: any[]
  videosByCategory: any[]
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      if (response.ok) {
        const dashboardData = await response.json()
        setData(dashboardData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se pudieron cargar los datos del dashboard</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Resumen de tu contenido de IA organizado
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canales</CardTitle>
            <Youtube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalChannels}</div>
            <p className="text-xs text-muted-foreground">canales activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.processedVideos}</div>
            <p className="text-xs text-muted-foreground">
              de {data.stats.totalVideos} procesados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Herramientas</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalTools}</div>
            <p className="text-xs text-muted-foreground">
              {data.stats.newTools} nuevas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Noticias</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalNews}</div>
            <p className="text-xs text-muted-foreground">
              {data.stats.highPriorityNews} importantes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tools */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Cpu className="h-5 w-5" />
              <span>Herramientas Recientes</span>
            </h2>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {data.recentTools.length > 0 ? (
              data.recentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No hay herramientas disponibles todavía
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent News */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Newspaper className="h-5 w-5" />
              <span>Noticias Recientes</span>
            </h2>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {data.recentNews.length > 0 ? (
              data.recentNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No hay noticias disponibles todavía
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Recent Videos */}
      {data.recentVideos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Videos Recientes</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.recentVideos.slice(0, 6).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}