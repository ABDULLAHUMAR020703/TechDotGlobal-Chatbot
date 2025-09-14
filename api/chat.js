// Vercel serverless function for TechDotGlobal chatbot
// Handles POST requests to /api/chat and proxies to Groq API

export default async function handler(req, res) {
  // Set CORS headers for GoDaddy integration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const { message } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required and must be a non-empty string' 
      });
    }

    // Get API key from environment variables
    const apiKey = process.env.GROQ_API_KEY;
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    if (!apiKey) {
      console.error('GROQ_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // TechDotGlobal system prompt
    const systemPrompt = `You are a helpful assistant for TechDotGlobal, a technology company founded in 2021 and rebranded in 2025. 

TechDotGlobal specializes in:
- AI/ML services and solutions
- Custom software development
- Mobile app development
- Web development
- Data analytics and insights

Notable projects include:
- RoadInsight: AI-powered road condition analysis
- Kahani App: Storytelling and content platform

Please respond only to queries related to TechDotGlobal's services, projects, or general technology questions that align with our expertise. For unrelated queries, politely redirect users to ask about our services or visit our website for more information.

Keep responses concise, professional, and helpful.`;

    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message.trim()
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq API error:', groqResponse.status, errorText);
      console.error('Groq API response headers:', Object.fromEntries(groqResponse.headers.entries()));
      return res.status(500).json({ 
        error: 'Failed to get response from AI service',
        details: `Status: ${groqResponse.status}, Response: ${errorText}`
      });
    }

    const data = await groqResponse.json();
    
    // Extract the response message
    const botMessage = data.choices?.[0]?.message?.content;
    
    if (!botMessage) {
      console.error('No message content in Groq response:', data);
      return res.status(500).json({ 
        error: 'Invalid response from AI service' 
      });
    }

    // Return the bot's response
    return res.status(200).json({
      message: botMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
