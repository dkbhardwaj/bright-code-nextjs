import React from 'react'


const LinkChecker = () => {

    return (
        <div className="section_bgImage bg-darkBlue py-[120px] mb-[80px]">
            <section className="linkChecker ">
                <div className="container">

                    <div className="formWrapper bgPurpleGradient py-[50px]">
                        <div className="intro text-center">
                            <h2 className='text-white'>Check 404 link on your site</h2>
                        </div>
                        <form
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
                                    value=""
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
        </div>
    )
}
export default LinkChecker;