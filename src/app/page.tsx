'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Youtube, Cpu, Newspaper, BarChart3, Sparkles, Zap, Globe } from 'lucide-react'
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
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded-xl w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-2xl glass-card"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
          <Sparkles className="h-16 w-16 text-gradient mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Configurando tu suite...</h3>
          <p className="text-white/70">Se están cargando tus datos. Esto puede tomar unos segundos.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient mb-3">Dashboard</h1>
        <p className="text-white/70 text-lg">
          Tu centro de comando para contenido de IA
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card hover-lift border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Canales</CardTitle>
            <div className="p-2 bg-red-500/20 rounded-xl">
              <Youtube className="h-4 w-4 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{data.stats.totalChannels}</div>
            <p className="text-xs text-white/60">canales activos</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Videos</CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{data.stats.processedVideos}</div>
            <p className="text-xs text-white/60">
              de {data.stats.totalVideos} procesados
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Herramientas</CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Cpu className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{data.stats.totalTools}</div>
            <p className="text-xs text-white/60">
              {data.stats.newTools} nuevas
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Noticias</CardTitle>
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Newspaper className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{data.stats.totalNews}</div>
            <p className="text-xs text-white/60">
              {data.stats.highPriorityNews} importantes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tools */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Cpu className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Herramientas Recientes</h2>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {data.recentTools.length > 0 ? (
              data.recentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))
            ) : (
              <Card className="glass-card border-0">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/70">No hay herramientas disponibles todavía</p>
                  <p className="text-white/50 text-sm mt-1">Procesa algunos videos para ver herramientas aquí</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent News */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Newspaper className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Noticias Recientes</h2>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {data.recentNews.length > 0 ? (
              data.recentNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))
            ) : (
              <Card className="glass-card border-0">
                <CardContent className="p-8 text-center">
                  <Globe className="h-12 w-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/70">No hay noticias disponibles todavía</p>
                  <p className="text-white/50 text-sm mt-1">Las noticias aparecerán cuando proceses contenido</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Recent Videos */}
      {data.recentVideos.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Videos Recientes</h2>
          </div>
          
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