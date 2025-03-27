import { checkLinksOnPage } from '../../utils/linkChecker';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url, options = {} } = req.body;
    
    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Create a simple stream controller
    const streamData = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    await checkLinksOnPage(url, options, streamData);
    
    res.end();
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}