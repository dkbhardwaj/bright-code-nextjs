import { useState,useRef, useEffect } from 'react';
import axios from 'axios';

const URLInput = ({ setResults }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus(); 
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/track', { url });
      setResults(response.data);
    } catch (error) {
      console.error('Error tracking URL:', error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full text-center relative z-10">
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="text-black w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 text-base !text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}
            className="w-full cursor-pointer gradient-btn py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
          {loading ? 'Tracking...' : 'Track URL'}
        </button>
      </form>
    </div>
  );
};

export default URLInput;
