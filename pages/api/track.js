import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      maxRedirects: 5, 
      validateStatus: (status) => status < 400, 
    });
    const currentDate = new Date().toUTCString(); 
    res.status(200).json({
      originalUrl: url,
      finalUrl: response.request.res.responseUrl,
      type: response.statusText,
      date: currentDate,
    });
  } catch (error) {
    console.error('Error tracking URL:', error);
    res.status(500).json({ message: 'Error tracking the URL' });
  }
}
