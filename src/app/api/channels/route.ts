import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Obtener todos los canales
export async function GET() {
  try {
    const channels = await prisma.channel.findMany({
      where: { isActive: true },
      include: {
        videos: {
          orderBy: { publishedAt: 'desc' },
          take: 5,
          include: {
            tools: true,
            news: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Agregar nuevo canal
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Channel URL is required' },
        { status: 400 }
      );
    }

    // Extraer información del canal usando el backend de Python
    const youtubeApiUrl = process.env.YOUTUBE_API_URL;
    if (!youtubeApiUrl) {
      return NextResponse.json(
        { error: 'YouTube API URL not configured' },
        { status: 500 }
      );
    }

    // Llamar al backend de Python para extraer info del canal
    const response = await fetch(`${youtubeApiUrl}/extract-channel-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || 'Failed to extract channel info' },
        { status: 400 }
      );
    }

    const channelInfo = await response.json();

    // Verificar si el canal ya existe
    const existingChannel = await prisma.channel.findUnique({
      where: { channelId: channelInfo.channel_id }
    });

    if (existingChannel) {
      return NextResponse.json(
        { error: 'Channel already exists' },
        { status: 400 }
      );
    }

    // Detectar idioma basado en la URL o nombre
    let language = 'en';
    if (url.includes('DotCSV') || channelInfo.name.includes('Español') || channelInfo.name.includes('Spanish')) {
      language = 'es';
    }

    // Crear el canal
    const channel = await prisma.channel.create({
      data: {
        name: channelInfo.name,
        channelId: channelInfo.channel_id,
        url: channelInfo.url,
        description: channelInfo.description,
        language
      }
    });

    // Obtener videos recientes del canal
    try {
      const videosResponse = await fetch(`${youtubeApiUrl}/get-channel-videos?channel_id=${channelInfo.channel_id}&max_results=10`, {
        method: 'POST'
      });

      if (videosResponse.ok) {
        const videosData = await videosResponse.json();
        
        // Crear videos en la base de datos
        for (const videoInfo of videosData.videos) {
          await prisma.video.create({
            data: {
              videoId: videoInfo.video_id,
              title: videoInfo.title,
              description: videoInfo.description,
              url: videoInfo.url,
              duration: videoInfo.duration,
              publishedAt: new Date(videoInfo.published_at),
              thumbnail: videoInfo.thumbnail,
              channelId: channel.id
            }
          });
        }
      }
    } catch (videoError) {
      console.log('Could not fetch videos immediately:', videoError);
      // No es crítico, los videos se pueden obtener después
    }

    return NextResponse.json({
      success: true,
      channel,
      message: 'Channel added successfully'
    });

  } catch (error) {
    console.error('Error adding channel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}