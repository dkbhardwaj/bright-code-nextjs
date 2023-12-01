import React from 'react'
import Style from '../styles/header.module.css'

export default function Navigation() {
    return (
        <header className={`${Style.header} bg-spaceBlack py-5`}>
            <div className="container">
                <div className={`${Style.mainRow} flex items-center justify-between`}>
                    <div className={`${Style.logo}`}>
                        <img src="/white-logo.png" alt="logo" />
                    </div>
                    <div className="links">
                        <ul className='flex items-center text-white'>
                            <li className='mx-5'><a href="#">Home</a></li>
                            <li className='mx-5'><a href="#">About Me</a></li>
                            <li className='mx-5'><a href="#">Work</a></li>
                            <li className='mx-5'><a href="#">Services</a></li>
                            <li className='mx-5'><a href="#" className='blue-btn'>Hire Me</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
