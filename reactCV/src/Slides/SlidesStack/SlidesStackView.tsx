import React, { useState, useRef, useEffect } from 'react';

import SlideView from '../SlideItem/SlideView';
import type { SlideModel } from '../SlideItem/SlideModel';

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
    const lastWheelTime = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    document.body.style.overflowX = "hidden"


    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    };

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
        const diffX = startX - clientX;
        const swipeThreshold = 50;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                nextSlide(); 
            } else {
                prevSlide();
            }
        }
        
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        const throttleDelay = 300;
        
        if (now - lastWheelTime.current < throttleDelay) {
            return;
        }
        
        const scrollThreshold = 8;
        
        if (Math.abs(e.deltaX) > scrollThreshold) {
            if (e.deltaX < 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } 
        
        lastWheelTime.current = now;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                nextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slides.length]);

    return (
        <div
            className="carusel-container"
            onWheel={handleWheel}
        >
            {/* Контейнер карусели */}
            <div
                className="carousel-track"
                ref={containerRef}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        className="carousel-slide"
                    >
                        <SlideView slide={slide} />
                    </div>
                ))}
            </div>

            {/* Индикаторы */}
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : 'indicator'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SlideList;
