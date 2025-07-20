'use client'

import { useState } from 'react'
import { Search, Filter, Clock, BookOpen, Cpu, Newspaper, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    
    setLoading(true)
    // TODO: Implementar búsqueda cuando el backend esté listo
    setTimeout(() => {
      setResults([])
      setLoading(false)
    }, 1000)
  }

  const filters = [
    { id: 'all', name: 'Todo', icon: Search },
    { id: 'videos', name: 'Videos', icon: BookOpen },
    { id: 'tools', name: 'Herramientas', icon: Cpu },
    { id: 'news', name: 'Noticias', icon: Newspaper },
  ]

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient mb-3">Buscar</h1>
        <p className="text-white/70 text-lg">
          Busca en transcripciones y contenido procesado
        </p>
      </div>

      {/* Search Card */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-white">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <span>Búsqueda de Contenido</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <Input
                placeholder="Buscar en transcripciones, herramientas, noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-blue-400/50"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading || !searchTerm.trim()}
              className="btn-apple hover-lift px-6"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => {
              const Icon = filterOption.icon
              return (
                <Button
                  key={filterOption.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter(filterOption.id)}
                  className={`flex items-center space-x-2 ${
                    filter === filterOption.id
                      ? 'bg-blue-500/20 border-blue-400/50 text-blue-400'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{filterOption.name}</span>
                </Button>
              )
            })}
          </div>
          
          {/* Results Area */}
          <div className="min-h-[300px]">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-400 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-white/70">Buscando contenido...</p>
                </div>
              </div>
            )}
            
            {!loading && results.length === 0 && searchTerm && (
              <div className="text-center py-20">
                <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
                  <Search className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Sin resultados</h3>
                  <p className="text-white/70">
                    No se encontraron resultados para "{searchTerm}". 
                    Procesa algunos videos primero.
                  </p>
                </div>
              </div>
            )}
            
            {!searchTerm && (
              <div className="text-center py-20">
                <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
                  <Sparkles className="h-16 w-16 text-gradient mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Comienza a buscar</h3>
                  <p className="text-white/70">
                    Ingresa un término de búsqueda para explorar tu contenido
                  </p>
                  <div className="mt-6 space-y-2">
                    <p className="text-white/50 text-sm">Ejemplos de búsqueda:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['machine learning', 'AI tools', 'tutorial'].map((example) => (
                        <button
                          key={example}
                          onClick={() => setSearchTerm(example)}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 hover:bg-white/20 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-white">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <span>Búsquedas Recientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/70">No hay búsquedas recientes</p>
            <p className="text-white/50 text-sm mt-1">Tus búsquedas aparecerán aquí</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}