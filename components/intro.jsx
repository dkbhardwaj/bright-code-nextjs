import React from 'react'

export default function Intro(props) {
    const header = {
        title: 'Header/Navigation',
        blurb: 'Here you can check Demos we created you can easily use it. Its quite easy to Create your own dream website & dashboard in No-time.',
    }

    const banner = {
        title: 'Banners',
        blurb: 'Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website & dashboard in No-time..',
    }
    const work = {

        title: 'Our Recent work with three column',
        blurb: 'You can relay on our amazing features list and also our customer services will be great experience for you without doubt and in no-time',
    }
    const portfolio = {
        title: 'Portfolio',
        blurb: 'Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website & dashboard in No-time.',
    }
    const team = {
        title: 'Team',
        blurb: 'Here you can check Demos we created based on WrapKit. Its quite easy to Create your own dream website & dashboard in No-time.',
    }

    // const gray = {
    //     color: 'bg-gray'
    // }
    var data;
    // var bgc;
    // console.log(props);
    // if (props.bg == 'gray') {
    //     bgc = gray;
    // }

    if (props.page == 'header') {
        data = header
    } else if (props.page == 'banner') {
        data = banner
    } else if (props.page == 'work') {
        data = work
    } else if (props.page == 'portfolio') {
        data = portfolio
    } else if (props.page == 'team') {
        data = team
    }


    // console.log(gray);
    // console.log(data)
    return (
        <section className={`intro py-32 text-center ${props.bg == 'lightGray' ? 'bg-lightGray' : ''}`}>
            <div className="container">
                <div className="w-full max-w-[600px] mx-auto">
                    <h2 className='text-darkGray'>{data.title}</h2>
                    <p className='text-gray mt-5'>{data.blurb}</p>
                </div>
            </div>
        </section>
    )
}
