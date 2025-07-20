'use client'

import { useState } from 'react'
import { Settings, Bell, Palette, Database, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient mb-3">Configuración</h1>
        <p className="text-white/70 text-lg">
          Personaliza tu experiencia en AI Content Suite
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card hover-lift border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <Bell className="h-5 w-5 text-yellow-400" />
              </div>
              <span>Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/90">Herramientas nuevas</span>
              <Button
                variant={notifications ? "default" : "outline"}
                size="sm"
                className={notifications ? "btn-apple" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}
                onClick={() => setNotifications(!notifications)}
              >
                {notifications ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                <span className="ml-2">{notifications ? 'Activado' : 'Desactivado'}</span>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Noticias importantes</span>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Configurar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <Palette className="h-5 w-5 text-purple-400" />
              </div>
              <span>Apariencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/90">Tema</span>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                🌙 Oscuro
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Idioma</span>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                🇪🇸 Español
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <Database className="h-5 w-5 text-green-400" />
              </div>
              <span>Datos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift">
              📤 Exportar datos
            </Button>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover-lift">
              🗑️ Limpiar cache
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Settings className="h-5 w-5 text-blue-400" />
              </div>
              <span>Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl">
                <span className="text-white/70">Versión</span>
                <span className="text-white font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl">
                <span className="text-white/70">Backend</span>
                <span className="text-green-400 font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Conectado
                </span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl">
                <span className="text-white/70">Base de datos</span>
                <span className="text-white font-medium">Supabase</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}