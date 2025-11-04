import React from 'react';
import './App.css'

import SplitText from './CVHeader/Header';
import SlideList from './Slides/SlidesStack/SlidesStackView';
import { mockSlides } from './Slides/SlideItem/SlideModel';

function App() {

  return (
    <>
      <div className='slides'>
        <SplitText
          text="Savva Ponomarev"
          className="split-text"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          tag='h1'
          />
        <SlideList slides={mockSlides} />
        </div>
    </>
  )
}

export default App
