import React from 'react'
// import Header from './header'
// import Footer from './footer'
import Head from 'next/head'

export default function Layout({ children }) {
    return (
        <>
            {/* <Header /> */}
            {children}
            {/*  <!-- Compiled and minified JavaScript --> */}
            {/* <Footer /> */}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> */}
        </>
    )
}
