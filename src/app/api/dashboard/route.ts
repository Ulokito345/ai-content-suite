import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener estadísticas del dashboard
    const totalChannels = await prisma.channel.count({
      where: { isActive: true }
    });

    const totalVideos = await prisma.video.count();
    const processedVideos = await prisma.video.count({
      where: { isProcessed: true }
    });

    const totalTools = await prisma.tool.count();
    const newTools = await prisma.tool.count({
      where: { isNew: true }
    });

    const totalNews = await prisma.newsItem.count();
    const highPriorityNews = await prisma.newsItem.count({
      where: { 
        importance: {
          in: ['HIGH', 'CRITICAL']
        }
      }
    });

    // Obtener contenido reciente por categorías
    const recentTools = await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        video: {
          include: {
            channel: true
          }
        }
      }
    });

    const recentNews = await prisma.newsItem.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        video: {
          include: {
            channel: true
          }
        }
      }
    });

    const recentVideos = await prisma.video.findMany({
      where: { isProcessed: true },
      orderBy: { publishedAt: 'desc' },
      take: 20,
      include: {
        channel: true,
        tools: true,
        news: true
      }
    });

    // Agrupar herramientas por categoría
    const toolsByCategory = await prisma.tool.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });

    // Agrupar videos por categoría
    const videosByCategory = await prisma.video.groupBy({
      by: ['category'],
      where: { isProcessed: true },
      _count: {
        id: true
      }
    });

    return NextResponse.json({
      stats: {
        totalChannels,
        totalVideos,
        processedVideos,
        totalTools,
        newTools,
        totalNews,
        highPriorityNews
      },
      recentTools,
      recentNews,
      recentVideos,
      toolsByCategory,
      videosByCategory
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}