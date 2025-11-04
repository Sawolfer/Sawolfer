import React from 'react';
import './App.css'

import SlideList from './Slides/SlidesStack/SlidesStackView';
import { mockSlides } from './Slides/SlideItem/SlideModel';

function App() {

  return (
    <>
      <div className='slides'>
          <SlideList slides={mockSlides} />
        </div>
    </>
  )
}

export default App
