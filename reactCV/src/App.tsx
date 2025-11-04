import React from 'react';
import './App.css'

import SlideList from './Slides/SlidesStack/SlidesStackView';
import { mockSlides } from './Slides/SlideItem/SlideModel';

function App() {

  return (
    <>
      <SlideList slides={mockSlides} />
    </>
  )
}

export default App
