import React, { useState } from 'react'
import Link from 'next/link';

const LinkChecker: React.FC = () => {

    const [showResult, setShowResult] = useState(false);
    const [showTab, setShowTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showSideBar, setShowSideBar] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setShowResult(true)

        setTimeout(() => {
            setLoading(false); // Set loading to false after some delay
        }, 3000);
    }

    const tabHandler = (val: number): void => {
        setShowTab(val)
    }
    const menuHandler = () => {
        showSideBar ? setShowSideBar(false) : setShowSideBar(true) 
        
    }

    return (
        <div className="section_bgImage bg-darkBlue py-[120px] linkChecker">
            <section className={`linkChecker ${showResult ? 'hidden' : 'block'}`}>
                <div className="container">

                    <div className="formWrapper bgPurpleGradient py-[50px]">
                        <div className="intro text-center">
                            <h2 className='text-white'>Check 404 link</h2>
                        </div>
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className=" relative w-mainRow ml-[-10px] flex flex-wrap md:w-full md:ml-0 mt-[30px]"
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

                        {/* <ul className='mt-[40px]'>
                                <li className='flex '>
                                    <h4 className='max-w-[200px] w-full text-white sm:max-w-full'>Status </h4> <h4 className='max-w-[500px] w-full text-white sm:max-w-full'> URL</h4>
                                </li>
                            </ul> */}

                    </div>
                </div>
            </section>
            {
                    showResult && loading ? 
                    <div className="loaderWrap w-full h-[100vh] ">
                        <div className="loader"></div>
                    </div>
                    : <section className={`resultWrap  flex pt-[50px] pb-[100px] md:pt-0 ${showResult ? 'black' : 'hidden'}`}>
                        <div className={`showMenu cursor-pointer py-[10px] px-[20px] bg-black fixed text-white top-[70px] md:block hidden`} onClick={() => menuHandler()}>
                            {showSideBar ? 'Hide Menu' : 'show Menu'}
                        </div>
                        <div className={`sidebarWrap max-w-[230px] p-[20px] bg-bgBluePurple h-[100vh] rounded-r-[20px] ${showSideBar ? 'md:left-0' : 'md:left-[-100%]'} transition-all ease-in-out duration-700 relative md:max-w-full md:absolute md:z-[99]`}>
                            <div className="sidebarBody">
                                <div className="sidebarMain">
                                    <ul>
                                        <li className={`p-[10px]  w-full ${showTab == 0 ? 'bg-black' : ''}`} onClick={() => tabHandler(0)}>
                                            <p className='text-white '>Overview
                                                <span className='block text-white text-[12px]'>Summary of the key results of the link check.</span>
                                            </p>
                                        </li>
                                        <li className={`p-[10px] ${showTab == 2 ? 'bg-black' : ''}`} onClick={() => tabHandler(2)}>
                                            <p className='text-white '>All Links</p>
                                        </li>
                                        <li className='p-[10px]' >
                                            <p className='text-white border-b-[2px] border-black'>Issues</p>
                                            <ul className='pl-[10px] mt-[10px]'>
                                                <li className={`mb-[10px] p-[10px] ${showTab == 3 ? 'bg-black' : ''}`} onClick={() => tabHandler(3)}>
                                                    <p className='text-white '>All Issues</p>
                                                </li>
                                                <li className={`mb-[10px] p-[10px] ${showTab == 4 ? 'bg-black' : ''}`} onClick={() => tabHandler(4)}>
                                                    <p className='text-white '>Broken</p>
                                                </li>
                                                <li className={`mb-[10px] p-[10px] ${showTab == 5 ? 'bg-black' : ''}`} onClick={() => tabHandler(5)}>
                                                    <p className='text-white '>Blacklisted</p>
                                                </li>
                                                <li className={`mb-[10px] p-[10px] ${showTab == 6 ? 'bg-black' : ''}`} onClick={() => tabHandler(6)}>
                                                    <p className='text-white '>Soft errors</p>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="fullPage w-[calc(100%-360px)] ml-[50px] desktop:w-[calc(100%-300px)] tablet:w-[calc(100%-300px)] md:w-full md:mx-[20px]">
                            <div className="introHeading mb-[20px]">
                                <div className="item ">
                                    <p className='font-bold text-white'>Project:- </p>
                                    <p></p>
                                </div>
                            </div>
                            <div className={`cardWrap flex w-[calc(100%+20px)] ml-[-10px] flex-wrap ${showTab == 0 ? 'block' : 'hidden'}`}>
                                <div className="card w-[calc(33.33%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px] ">
                                    <Link href={''} className='redirect'>.</Link>
                                    <div className="content">
                                        <p className='text-white'>Total Links</p>
                                        <h3 className='text-center text-white mt-[10px]'>168</h3>
                                    </div>
                                </div>
                                <div className="card w-[calc(33.33%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    <Link href={''} className='redirect'>.</Link>
                                    <div className="content">
                                        <p className='text-white'>Links with Issues</p>
                                        <h3 className='text-center text-white mt-[10px]'>4</h3>
                                    </div>
                                </div>
                                <div className="card w-[calc(33.33%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    <Link href={''} className='redirect'>.</Link>
                                    <div className="content">
                                        <p className='text-white'>New Links</p>
                                        <h3 className='text-center text-white mt-[10px]'>n/a</h3>
                                    </div>
                                </div>
                                <div className="card w-[calc(33.33%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] lg:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    {/* <Link href={''} className='redirect'>.</Link> */}
                                    <div className="content">
                                        <p className='text-white'>Issue Types</p>
                                        <div className="item flex border-b-[4px] border-black justify-between mt-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>404 Not found</p>
                                            <p className='text-white'>4</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card w-[calc(33.33%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] lg:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    {/* <Link href={''} className='redirect'>.</Link> */}
                                    <div className="content">
                                        <p className='text-white'>Link Types</p>
                                        <div className="item flex border-b-[4px] border-black border-w-[90%] justify-between my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>img src</p>
                                            <p className='text-white'>90</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[43%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>a href</p>
                                            <p className='text-white'>43</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[25%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>script src</p>
                                            <p className='text-white'>25</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[2%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>social meta tag</p>
                                            <p className='text-white'>2</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[2%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>css url()</p>
                                            <p className='text-white'>2</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[2%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>frame src</p>
                                            <p className='text-white'>2</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[1%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>Start URL</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[3%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>Other</p>
                                            <p className='text-white'>3</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card w-[calc(33.33%-20px)] desktop:w-[calc(50%-20px)] lg:w-[calc(100%-20px)] mx-[10px] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    {/* <Link href={''} className='redirect'>.</Link> */}
                                    <div className="content">
                                        <p className='text-white'>Top Hosts</p>
                                        <div className="item flex border-b-[4px] border-black border-w-[90%] justify-between my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>healtraumas.vercel.app</p>
                                            <p className='text-white'>151</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[43%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>blogs.biomedcentral.com</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[25%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>givebutter.com</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[2%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>healtraumas.org</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[2%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>js.givebutter.com</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[2%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>maps.org</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[1%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>pubmed.ncbi.nlm.nih.gov</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[3%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>www.alumni.hbs.edu</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[3%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>www.facebook.com</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                        <div className="item flex border-b-[4px] border-black justify-between border-w-[3%] my-[10px] relative">
                                            <Link href={''} className='redirect'>.</Link>
                                            <p className='text-white'>www.forbes.com</p>
                                            <p className='text-white'>1</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`cardWrap flex w-[calc(100%+20px)] ml-[-10px] flex-wrap ${showTab == 2 ? 'block' : 'hidden'}`} id="2">
                                <div className="card w-full mx-[10px] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    <div className="linksWraps">
                                        <table >
                                            <thead >
                                                <tr>
                                                    <th className='w-[150px] text-left py-[10px]'>Result</th>
                                                    <th className='text-left py-[10px]'>URL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className=''>
                                                    <td className='w-[150px] text-left text-white py-[5px]'>Ok</td>
                                                    <td>
                                                        <Link href="" className='text-white py-[5px]'>https://healtraumas.vercel.app/</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='w-[150px] text-left text-white py-[5px]'>Ok</td>
                                                    <td>
                                                        <Link href="" className='text-white py-[5px]'>https://healtraumas.vercel.app/</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='w-[150px] text-left text-white py-[5px]'>Ok</td>
                                                    <td>
                                                        <Link href="" className='text-white py-[5px]'>https://healtraumas.vercel.app/</Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className={`cardWrap flex w-[calc(100%+20px)] ml-[-10px] flex-wrap ${showTab == 3 ? 'block' : 'hidden'}`} id="3">
                                <div className="card w-full mx-[10px] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    <div className="linksWraps">
                                        <table >
                                            <thead >
                                                <tr>
                                                    <th className='w-[150px] text-left py-[10px]'>Result</th>
                                                    <th className='text-left py-[10px]'>URL</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                <tr>
                                                    <td className='w-[150px] text-left text-white'>Ok</td>
                                                    <td>
                                                        <Link href="" className='text-white '>https://healtraumas.vercel.app/</Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className={`cardWrap flex w-[calc(100%+20px)] ml-[-10px] flex-wrap ${showTab == 4 ? 'block' : 'hidden'}`} id="4">
                                <div className="card w-full mx-[10px] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                                    <div className="linksWraps">
                                        <table >
                                            <thead >
                                                <tr>
                                                    <th className='w-[150px] text-left py-[10px]'>Result</th>
                                                    <th className='text-left py-[10px]'>URL</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                <tr>
                                                    <td className='w-[150px] text-left text-white'>Ok</td>
                                                    <td>
                                                        <Link href="" className='text-white '>https://healtraumas.vercel.app/</Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>}
        </div>
    )
}
export default LinkChecker;