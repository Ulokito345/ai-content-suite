import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { openaiClient } from '@/lib/mistral';
import { Category, ToolCategory, Priority } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Buscar el video en la base de datos
    const video = await prisma.video.findUnique({
      where: { videoId },
      include: { channel: true }
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    if (!video.transcriptClean) {
      return NextResponse.json(
        { error: 'Video transcript not available' },
        { status: 400 }
      );
    }

    if (video.isProcessed) {
      return NextResponse.json(
        { message: 'Video already processed' },
        { status: 200 }
      );
    }

    // Analizar contenido con OpenAI GPT-4o mini
    const analysis = await openaiClient.analyzeContent(
      video.transcriptClean,
      video.title,
      video.channel?.name || 'Unknown'
    );

    // Actualizar video con análisis
    const updatedVideo = await prisma.video.update({
      where: { id: video.id },
      data: {
        summary: analysis.summary,
        category: analysis.category as Category,
        priority: analysis.priority as Priority,
        isProcessed: true
      }
    });

    // Crear herramientas si existen
    if (analysis.tools && analysis.tools.length > 0) {
      for (const tool of analysis.tools) {
        await prisma.tool.create({
          data: {
            name: tool.name,
            description: tool.description,
            category: tool.category as ToolCategory,
            url: tool.url,
            pricing: tool.pricing,
            features: tool.features || [],
            videoId: video.id
          }
        });
      }
    }

    // Crear noticias si existen
    if (analysis.news && analysis.news.length > 0) {
      for (const newsItem of analysis.news) {
        await prisma.newsItem.create({
          data: {
            title: newsItem.title,
            summary: newsItem.summary,
            importance: newsItem.importance as Priority,
            videoId: video.id
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      video: updatedVideo,
      analysis
    });

  } catch (error) {
    console.error('Error analyzing video:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}