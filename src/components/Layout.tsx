'use client'

import { ReactNode } from 'react'
import { Menu, Home, Youtube, Settings, Search, Cpu } from 'lucide-react'
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
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">AI Content Suite</h1>
              </div>
            </div>
            
            {/* Navigation for larger screens */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around">
          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center py-2 px-3 text-xs',
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}