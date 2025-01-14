import { useState } from 'react';
import URLInput from '../../components/wheregoesComp/UrlInput';
import Result from '../../components/wheregoesComp/Result';

export default function Home() {
  const [results, setResults] = useState(null);
  
//https://ydnt.com/
  return (
    <>
     <section
      className={` md:!pb-[40px] banner-second banner_DarkOverlay banner_bg_img banner-with-img bg-darkBlue text-white md:items-baseline`}
      
    >
      <div className="container">
      <div className="w-full text-center relative z-10">
      <h1 className="text-white mb-[20px]" >Track URL Redirects</h1>
        <URLInput setResults={setResults} />
          </div>
         
      </div>
     
    </section>
    {
        results && (
            <section className='py-[60px]'>
            <div className="container">
            <Result data={results} />
            </div>
        </section>
        )
    }
   
    </>
  );
}
