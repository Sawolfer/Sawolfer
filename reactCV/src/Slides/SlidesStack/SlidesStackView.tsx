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
    const [isIndicatorsFixed, setIsIndicatorsFixed] = useState(false);
    const lastWheelTime = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const delay = 100;

    useEffect(() => {
        document.body.style.overflowX = "hidden";
        return () => {
            document.body.style.overflowX = ""; 
        };
    }, []);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    };


    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (!containerRef.current) return;
            
    //         const carouselRect = containerRef.current.getBoundingClientRect();
    //         const viewportHeight = window.innerHeight;
            
    //         const shouldFix = carouselRect.bottom <= (viewportHeight - 30);
    //         setIsIndicatorsFixed(shouldFix);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     handleScroll();
        
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

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

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        const diffX = dragOffset; 
        const swipeThreshold = 50;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX < 0) {
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

    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        const throttleDelay = 800;
        
        if (now - lastWheelTime.current < throttleDelay) {
            return;
        }
        
        const scrollThreshold = 10;
        const delta = e.deltaX;
        
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

    return (
        <div className="carousel-container">
            <div
                className="carousel-track"
                style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : (dragOffset !== 0 ? 'transform 0.3s ease' : 'transform 0.4s ease')
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

            {/* Индикатор с эффектом прилипания */}
            <div 
                ref={indicatorRef}
                className={`carousel-indicators ${isIndicatorsFixed ? 'fixed-bottom' : ''}`}
            >
                <GlassSurface
                    width={300} 
                    height={50}
                    borderRadius={24}
                    className='carousel-glass'
                >
                    <div style={{ display: 'flex', gap: '10px', padding: '8px 16px' }}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </GlassSurface>
            </div>
        </div>
    );
}

export default SlideList;