import React, { useState, useEffect } from 'react'

export default function ColCards(props) {
    const [col4, setcol4] = useState(false)
    useEffect(() => {
        if (props.col == 4) {
            setcol4(true)
        }

    }, [])

    const cards = [
        {
            title: 'Branding for Theme Designer',
            blurb: 'Digital Marketing',
        },
        {
            title: 'Button Designs Free',
            blurb: 'Search Engine',
        },
        {
            title: 'Branding & Co Agency',
            blurb: 'Admin templates',
        },
        {
            title: 'Zukandre Phoniex',
            blurb: 'Branding',
        },
        {
            title: 'Sionage Mokcup',
            blurb: 'Wll Mockup',
        },
        {
            title: 'Hard Cover Book Mock',
            blurb: 'Book Covers',
        },
    ];
    const team = [
        {
            title: 'Michael Doe',
            profession: 'Property Specialist',
            blurb: 'You can relay on our amazing features list and also our customer services will be great experience.'
        },
        {
            title: 'Michael Doe',
            profession: 'Property Specialist',
            blurb: 'You can relay on our amazing features list and also our customer services will be great experience.'
        },
        {
            title: 'Michael Doe',
            profession: 'Property Specialist',
            blurb: 'You can relay on our amazing features list and also our customer services will be great experience.'
        },
        {
            title: 'Michael Doe',
            profession: 'Property Specialist',
            blurb: 'You can relay on our amazing features list and also our customer services will be great experience.'
        },
    ];

    var content;
    if (props.content == 'cards') {
        content = cards
    } else if (props.content == 'banner') {
        content = team
    } 
    return (
        <section className="introWithCards py-32">
            <div className="container">
                <div className="w-mainRow flex flex-wrap">
                    {cards.map((data, index) => (
                        <div key={index} className={`${col4 ? 'w-colFour' : 'w-threeCard'} mx-2.5 mb-5`}>
                            <div className="card bg-white shadow-slate-100 shadow-lg">
                                <div className="imageWrap">
                                    <img src="/img1.jpg" alt="image" />
                                </div>
                                <div className="textWrap p-4">
                                    <h5 className='text-darkGray'>{data.title}</h5>
                                    <span className='text-gray mt-2 inline-block'>{data.blurb}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <div className="w-colFour mx-2.5">
                        <div className="card bg-white">
                            <div className="imageWrap">
                                <img src="/card1.jpg" alt="image" />
                            </div>
                            <div className="textWrap p-4">
                                <h5 className='text-darkGray'>Michael Doe</h5>
                                <span className='text-gray mt-2 inline-block'>Property Specialist</span>
                                <p className='text-gray mt-4'>You can relay on our amazing features list and also our customer services will be great experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-colFour mx-2.5">
                        <div className="card bg-whit">
                            <div className="imageWrap">
                                <img src="/card1.jpg" alt="image" />
                            </div>
                            <div className="textWrap p-4">
                                <h5 className='text-darkGray'>Michael Doe</h5>
                                <span className='text-gray mt-2 inline-block'>Property Specialist</span>
                                <p className='text-gray mt-4'>You can relay on our amazing features list and also our customer services will be great experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-colFour mx-2.5">
                        <div className="card bg-white">
                            <div className="imageWrap">
                                <img src="/card1.jpg" alt="image" />
                            </div>
                            <div className="textWrap p-4">
                                <h5 className='text-darkGray'>Michael Doe</h5>
                                <span className='text-gray mt-2 inline-block'>Property Specialist</span>
                                <p className='text-gray mt-4'>You can relay on our amazing features list and also our customer services will be great experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-colFour mx-2.5">
                        <div className="card bg-white">
                            <div className="imageWrap">
                                <img src="/card1.jpg" alt="image" />
                            </div>
                            <div className="textWrap p-4">
                                <h5 className='text-darkGray'>Michael Doe</h5>
                                <span className='text-gray mt-2 inline-block'>Property Specialist</span>
                                <p className='text-gray mt-4'>You can relay on our amazing features list and also our customer services will be great experience.</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}
