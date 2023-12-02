import React, { useState, useEffect } from 'react';

interface ColCardsProps {
  content: 'cards' | 'team';
  col?: number; // Make col optional since it's not always provided
}

const ColCards: React.FC<ColCardsProps> = ({ content, col = 3 }) => {
  const [col4, setCol4] = useState(false);

  useEffect(() => {
    if (col === 4) {
      setCol4(true);
    }
  }, [col]);

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
    // Add other card items as needed
  ];

  const team = [
    {
      title: 'Michael Doe',
      profession: 'Property Specialist',
      blurb: 'You can rely on our amazing features list and also our customer services will be a great experience.',
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
    // Add other team items as needed
  ];

  const contentData = content === 'cards' ? cards : team;

  return (
    <section className="introWithCards py-20">
      <div className="container">
        <div className="w-mainRow -ml-2.5 flex flex-wrap">
          {contentData.map((data, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default ColCards;
