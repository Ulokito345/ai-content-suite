// Cliente para OpenAI GPT-4o mini
export class OpenAIClient {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeContent(transcript: string, videoTitle: string, channelName: string): Promise<any> {
    const prompt = this.createAnalysisPrompt(transcript, videoTitle, channelName);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto analista de contenido de IA. Tu trabajo es categorizar y extraer información relevante de videos de YouTube sobre inteligencia artificial.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      return JSON.parse(content);
    } catch (error) {
      console.error('Error analyzing content with OpenAI:', error);
      throw error;
    }
  }

  private createAnalysisPrompt(transcript: string, videoTitle: string, channelName: string): string {
    return `
Analiza el siguiente contenido de un video de YouTube sobre inteligencia artificial y devuelve un JSON con la siguiente estructura:

{
  "category": "TOOLS|NEWS|TUTORIAL|RESEARCH|STARTUP|UNCATEGORIZED",
  "priority": "LOW|MEDIUM|HIGH|CRITICAL",
  "summary": "Resumen en español del contenido principal (2-3 oraciones)",
  "tools": [
    {
      "name": "Nombre de la herramienta",
      "description": "Descripción breve en español",
      "category": "VIDEO|IMAGE|TEXT|AUDIO|CODE|DATA|DESIGN|PRODUCTIVITY|OTHER",
      "url": "URL si se menciona",
      "pricing": "Información de precios si se menciona",
      "features": ["característica1", "característica2"]
    }
  ],
  "news": [
    {
      "title": "Título de la noticia",
      "summary": "Resumen de la noticia en español",
      "importance": "LOW|MEDIUM|HIGH|CRITICAL"
    }
  ]
}

**Criterios de categorización:**
- TOOLS: Si presenta/demuestra herramientas específicas de IA
- NEWS: Si habla de noticias del sector, lanzamientos, actualizaciones
- TUTORIAL: Si enseña cómo hacer algo paso a paso
- RESEARCH: Si discute papers, investigación, técnicas
- STARTUP: Si habla de empresas, inversiones, mercado
- UNCATEGORIZED: Si no encaja claramente en las anteriores

**Criterios de prioridad:**
- CRITICAL: Lanzamientos muy importantes, noticias disruptivas
- HIGH: Herramientas muy útiles, noticias relevantes
- MEDIUM: Contenido interesante pero no urgente
- LOW: Contenido de relleno o muy específico

**Información del video:**
- Canal: ${channelName}
- Título: ${videoTitle}
- Transcripción: ${transcript.substring(0, 4000)}...

Responde SOLO con el JSON válido, sin texto adicional.
`;
  }
}

export const openaiClient = new OpenAIClient(process.env.OPENAI_API_KEY || '');