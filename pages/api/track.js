import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    // console.log(url)
    // const x = await fetch(url)
    // console.log(x)
    const response = await axios.get(url, {
      maxRedirects: 5, 
      validateStatus: (status) => status < 400, 
    });
    
    

    const originalStatus = response.status;  
    const finalUrl = response.request.res.responseUrl;  
    const finalStatus = response.status; 

    res.status(200).json({
      originalUrl: url,
      originalStatus: originalStatus,  
      finalUrl: finalUrl,  
      finalStatus: finalStatus,  
      type: response.statusText,  
      date: response.headers.date,
    });
  } catch (error) {
    console.error('Error tracking URL:', error);
    res.status(500).json({ message: 'Error tracking the URL' });
  }
}
