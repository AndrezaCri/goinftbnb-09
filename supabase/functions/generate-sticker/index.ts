
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation and sanitization
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 500); // Limit length
};

const validatePrompt = (prompt: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeInput(prompt);
  
  if (!sanitized) {
    return { isValid: false, error: 'Prompt is required' };
  }
  
  if (sanitized.length < 5) {
    return { isValid: false, error: 'Prompt must be at least 5 characters long' };
  }
  
  if (sanitized.length > 200) {
    return { isValid: false, error: 'Prompt must be less than 200 characters' };
  }
  
  return { isValid: true };
};

// Rate limiting storage (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_PER_HOUR = 10;

const checkRateLimit = (clientId: string): boolean => {
  const now = Date.now();
  const hourInMs = 60 * 60 * 1000;
  
  const userRequests = requestCounts.get(clientId);
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(clientId, { count: 1, resetTime: now + hourInMs });
    return true;
  }
  
  if (userRequests.count >= RATE_LIMIT_PER_HOUR) {
    return false;
  }
  
  userRequests.count++;
  return true;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract client identifier for rate limiting
    const authHeader = req.headers.get('authorization');
    const clientId = authHeader || req.headers.get('x-client-info') || 'anonymous';
    
    // Check rate limit
    if (!checkRateLimit(clientId)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Maximum 10 requests per hour.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { prompt, category } = await req.json();
    
    // Validate and sanitize input
    const promptValidation = validatePrompt(prompt);
    if (!promptValidation.isValid) {
      return new Response(
        JSON.stringify({ error: promptValidation.error }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const sanitizedPrompt = sanitizeInput(prompt);
    const sanitizedCategory = sanitizeInput(category || 'sports');

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'AI service temporarily unavailable' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Enhance prompt with safety guidelines
    const enhancedPrompt = `${sanitizedPrompt} - style: ${sanitizedCategory}, sticker design, high quality, detailed, family-friendly, appropriate content`;

    console.log('Generating sticker with sanitized prompt:', enhancedPrompt);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard"
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return new Response(
        JSON.stringify({ error: 'Failed to generate image. Please try again.' }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (data?.data?.[0]?.url) {
      return new Response(
        JSON.stringify({ imageUrl: data.data[0].url }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      console.error('No image generated:', data);
      return new Response(
        JSON.stringify({ error: 'No image generated. Please try again.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
  } catch (error) {
    console.error('Error in generate-sticker function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error. Please try again later.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
