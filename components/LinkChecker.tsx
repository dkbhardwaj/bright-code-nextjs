import React, { useState, useEffect } from 'react'
import Link from 'next/link';


const LinkChecker = () => {
    const [url, setUrl] = useState('');
    const [linkStatus, setLinkStatus] = useState(null);
    const [totalCount, setTotalCount] = useState([]);
    let $count = 0;

    // Loader Variables
    const [loading, setLoading] = useState(false);
    const [resStatus, setResStatus] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(url);

        // setTimeout(() => {
            setLoading(true); // Set loading to false after some delay
        //   }, 3000);

        const timeoutMs = 120000; // 120 seconds
        const timer = setTimeout(() => {
            // res.status(500).json({ error: 'Timeout error: Function execution exceeded maximum time limit' });
            console.error('Timeout error: Function execution exceeded maximum time limit');
        }, timeoutMs);
        try {

            const response = await fetch(`/api/checkStatus?url=${encodeURIComponent(url)}`);
            // console.log(response.status);
            if(response.status == 504) {
                setResStatus(1) 
                setLoading(false) 
            } else {
                setResStatus(0)
            }
            
            const data = await response.json();
            console.log(data);
            setLoading(false) 
            clearTimeout(timer);
            console.log(data.linkStatus);
            setLinkStatus(data.linkStatus);
        } catch (error) {
            clearTimeout(timer);
            console.error('Error:', error);
        }
    };

    return (
        <div className="section_bgImage bg-darkBlue py-[50px] mb-[80px]">
            <section className="linkChecker ">
                <div className="container">

                    <div className="formWrapper bgPurpleGradient py-[50px]">
                        <div className="intro text-center">
                            <h2 className='text-white'>Check 404 link on your site</h2>
                        </div>
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className=" relative w-mainRow ml-[-10px] flex flex-wrap md:w-full md:ml-0"
                        >
                            <div className="relative mb-[22px] w-full mx-[10px] md:w-full md:mx-0">
                                <label
                                    htmlFor="fullName"
                                    className="leading-6 text-[17px] text-white font-normal"
                                >
                                    Enter Your site Link
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required={true}
                                    className={`w-full relative mt-2 py-[14px] px-3 bg-white rounded-[9px] border border-white border-solid focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out`}
                                />
                            </div>

                            <button
                                type="submit"
                                className="gradient-btn  mx-[10px] mb-[22px] md:mx-0 mx-auto"
                            >
                                <span>Check</span>
                            </button>
                        </form>
                        { loading ? <div className="loader"></div> : resStatus ? <h3>Gate Timeout 504 error</h3> : linkStatus && (
                            <ul className='mt-[40px]'>
                                <li className='flex'>
                                    <h4 className='max-w-[200px] w-full text-white'>Status </h4> <h4 className='max-w-[500px] w-full text-white'> URL</h4>
                                </li>
                                {Object.entries(linkStatus).every(([, status]) => status === 'OK') ? (
                                    <li><p>No results found</p></li>
                                ) : (
                                    (Object.entries(linkStatus) as [string, string][]).map(([link, status]) => (
                                        status !== 'OK' && (
                                            <li key={link} className='flex'>
                                                <p className='max-w-[200px] w-full inline-block text-white'>404 {status}</p>
                                                <p><Link href={link} className='text-white'>{link}:</Link></p>
                                            </li>
                                        )
                                    ))
                                )}
                            </ul>
                        ) }
                        
                    </div>
                </div>
            </section>
        </div>
    )
}
export default LinkChecker;