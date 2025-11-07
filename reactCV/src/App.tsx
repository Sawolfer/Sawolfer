import React from 'react';
import './App.css'

import SplitText from './CVHeader/Header';
import SlideList from './Slides/SlidesStack/SlidesStackView';
import { mockSlides } from './Slides/SlideItem/SlideModel';

function App() {

  return (
    <>
      <div className='content'>
        <div className='header-text'>
          <div className='about-me'>
            <SplitText
              text="Hello! I'm Savva"
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
            <p className='about-me-text'>
              3rd year Bachelor student at Innopolis University <br/>
              Turning ideas into elegant digital solutions
            </p>
          </div>
          <img src='/background.jpg' alt='image' className='my-image' />
        </div>
        <div className='projects'>
          <p className='projects-header'>
            Here you can check my projects
          </p>
          <div className='slides'>
            <SlideList slides={mockSlides} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
