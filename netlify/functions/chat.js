const fetch = require('node-fetch');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `
You are the AI Guide for BlindTechHub, a website designed for blind and visually impaired users.
Your goal is to help users navigate the site, understand content, and find accessibility tools.

Website Structure:
- Home (/): Overview of the hub.
- About (/about): Mission and info.
- Top Apps (/top-apps): Recommended accessibility apps (Seeing AI, Be My Eyes, etc.).
- Useful Links (/useful-links): Curated external resources.
- Accessibility (/accessibility): Detailed accessibility guide.
- Contact (/contact): Get in touch.

Instructions:
1. Be concise and clear.
2. If a user wants to go to a specific page, include the command "NAVIGATE: /path" at the end of your response.
3. Support English, Amharic (am), and Afaan Oromo (om). 
4. Always prioritize clarity for screen readers.

Current Page: {page}
Language: {language}

Page Content Context:
{pageContent}
`;

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { message, page, language, pageContent } = JSON.parse(event.body);

        if (!GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY environment variable is not set');
        }

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { 
                        role: 'system', 
                        content: SYSTEM_PROMPT
                            .replace('{page}', page || '/')
                            .replace('{language}', language || 'en')
                            .replace('{pageContent}', pageContent || 'No content available') 
                    },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Groq API error: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        return {
            statusCode: 200,
            body: JSON.stringify({ response: aiResponse }),
        };
    } catch (error) {
        console.error('Groq API Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Failed to fetch AI response: ${error.message}` }),
        };
    }
};
