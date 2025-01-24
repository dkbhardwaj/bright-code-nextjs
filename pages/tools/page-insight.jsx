import { useState } from 'react';
import PageSpeed from '../../components/PageSpeedStats';


export default function Home() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const fetchLighthouseData = async (e) => {
      e.preventDefault();
  
      setLoading(true);
      setError('');
      
      try {
        const res = await fetch(`/api/pagespeed?url=${(url)}`);
        const data = await res.json();
        
        if (res.ok) {
          setResult({
            performance: data.performance || 0,
            accessibility: data.accessibility || 0,
            seo: data.seo || 0,
            bestPractice: data.bestPractice || 0,
          });
        } else {
          setError(data.error || 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch Lighthouse data');
      } finally {
        setLoading(false);
      }
    };


  return (
    <>  
     <section className="md:!pb-[40px] banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue text-white md:items-baseline">
        <div className="container">
          <div className="w-full text-center relative z-10">
            <h1 className="text-white">Analyze your page</h1>
            <div className="max-w-md mx-auto">
            <form onSubmit={fetchLighthouseData} className="form">
          <input
            type="url"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-black w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 text-base !text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
            required
          />
          <button className="w-full cursor-pointer gradient-btn py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                type="submit">Analyze</button>
        </form>
            </div>
          </div>
        </div>
      </section>
      
      {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      {(!loading &&  !error && result) && (<PageSpeed result={result}/>)}
    </>
  );
}
