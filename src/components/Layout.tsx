'use client'

import { ReactNode } from 'react'
import { Menu, Home, Youtube, Settings, Search, Cpu, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Canales', href: '/channels', icon: Youtube },
  { name: 'Herramientas', href: '/tools', icon: Cpu },
  { name: 'Buscar', href: '/search', icon: Search },
  { name: 'Configuración', href: '/settings', icon: Settings },
]

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Sparkles className="h-8 w-8 text-gradient" />
                  <div className="absolute inset-0 h-8 w-8 bg-blue-500/20 rounded-full blur-lg"></div>
                </div>
                <h1 className="text-xl font-bold text-gradient">AI Content Suite</h1>
              </div>
            </div>
            
            {/* Navigation for larger screens */}
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover-lift',
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors">
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
        {children}
      </main>

      {/* Mobile navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 pb-safe">
        <div className="flex justify-around px-2 py-2">
          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center py-2 px-3 text-xs rounded-xl transition-all duration-200',
                  isActive
                    ? 'text-blue-400 bg-blue-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}