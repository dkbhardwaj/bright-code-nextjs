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
    
    // Vercel-compatible streaming approach
    const sendEvent = (data) => {
      const payload = JSON.stringify(data);
      res.write(`data: ${payload}\n\n`);
      // Remove res.flush() as it's not supported on Vercel
    };

    // Handle client disconnect
    let isConnectionAlive = true;
    req.on('close', () => {
      isConnectionAlive = false;
    });

    await checkLinksOnPage(url, options, (data) => {
      if (isConnectionAlive) {
        sendEvent(data);
      }
    });
    
    res.end();
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}