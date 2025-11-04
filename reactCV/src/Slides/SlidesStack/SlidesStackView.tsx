import React, { useState, useRef, useEffect } from 'react';

import SlideView from '../SlideItem/SlideView';
import type { SlideModel } from '../SlideItem/SlideModel';

import GlassSurface from '../../ViewComponents/LiquidGlass/LiquidGlass';

import "./SlidesStackView.css"

interface SlideListProps {
    slides: SlideModel[];
    autoplay?: boolean;
    autoplayDelay?: number;
}

function SlideList({ slides }: SlideListProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const lastWheelTime = useRef(0);

    document.body.style.overflow = "hidden"

    const delay = 100;

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    };

    // Touch/Mouse handlers
    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setDragOffset(0); 
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diffX = startX - clientX;
        setDragOffset(-diffX);
        e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
        const diffX = startX - clientX;
        const swipeThreshold = 50;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                setDragOffset(-100);
                setTimeout(() => {
                    nextSlide();
                    setDragOffset(0);
                }, delay);
            } else {
                setDragOffset(100);
                setTimeout(() => {
                    prevSlide();
                    setDragOffset(0);
                }, delay);
            }
        } else {
            setDragOffset(0);
        }
        
        setIsDragging(false);
    };

    // Wheel handler
    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        const throttleDelay = 800;
        
        if (now - lastWheelTime.current < throttleDelay) {
            return;
        }
        
        const scrollThreshold = 10;
        
        // const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const delta = e.deltaX;
        // console.log('Wheel delta:', delta);
        
        if (Math.abs(delta) > scrollThreshold) {
            if (delta < 0) {
                setDragOffset(100);
                setTimeout(() => {
                    prevSlide();
                    setDragOffset(0);
                }, delay);
            } else {
                setDragOffset(-100);
                setTimeout(() => {
                    nextSlide();
                    setDragOffset(0);
                }, delay);
            }
            
            lastWheelTime.current = now;
        }
    };

    // В JSX:
    return (
        <div className="carousel-container">
            <div
                className="carousel-track"
                style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                    transition: dragOffset !== 0 ? 'transform 0.3s ease' : 'transform 0.4s ease'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onWheel={handleWheel}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="carousel-slide">
                        <SlideView slide={slide} />
                    </div>
                ))}
            </div>

            {/* Индикаторы */}
            <GlassSurface
                    width={300} 
                    height={50}
                    borderRadius={24}
                    className='carousel-glass'
                >
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : 'indicator'}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
            </GlassSurface>
        </div>
    );
}

export default SlideList;
