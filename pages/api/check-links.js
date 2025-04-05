import { checkLinksOnPage } from '../../utils/linkChecker';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url, options = {} } = req.body;
    
    // Set proper SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Content-Encoding', 'none');
    
    // Flush headers immediately
    res.flushHeaders();

    // Handle client disconnect
    req.on('close', () => {
      console.log('Client disconnected');
      res.end();
    });

    // Ensure proper SSE format
    const sendEvent = (data) => {
      const payload = JSON.stringify(data);
      res.write(`data: ${payload}\n\n`);
      // Force flush the response
      res.flush();
    };

    await checkLinksOnPage(url, options, sendEvent);
    
    res.end();
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}