import React from 'react'

export default function ContentWithImage() {
  return (
    <section className="contentWithImage py-32 overflow-hidden bg-opalGreen">
      <div className="bgWrap absolute w-full h-full top-0 left-0 z-[-1]">
        {/* <img className='cover' src="/bgimage.jpg" alt="image" /> */}
      </div>
      <div className="container">
        <div className="w-full flex justify-end z-1">
          <div className="content w-halfWidth text-white">
            <h3>Pro Version coming soon</h3>
            <p className='mt-4'>We will add Pro Version with tons of great features and multiple category demos which is ready to use...</p>
            <div className="btnWrap mt-8">
              <a href="#" className="black-btn">Coming Soon</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
