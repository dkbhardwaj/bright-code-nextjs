import React from 'react'
import ContectFormFullWidth from "./contactForm"
import ContectFormHalfWidth from "./ContactFormSecond"

export default function index({data}) {

  return (
    <>
     { data.fullWidth ? <ContectFormFullWidth data={data}/> : <ContectFormHalfWidth data={data}/>}
    </>
  )
}
