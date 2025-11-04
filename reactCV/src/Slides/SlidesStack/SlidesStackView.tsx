import React, { useState, useRef, useEffect } from 'react';

import SlideView from '../SlideItem/SlideView';
import type { SlideModel } from '../SlideItem/SlideModel';

import "./SlidesStackView.css"

interface SlideListProps {
    slides: SlideModel[];
}

function SlideList({ slides }: SlideListProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
    };

    const handleToucMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
    }

    const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
        const diffX = startX - clientX;
        const swipeThreshold = 50;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
            } else {
                // Swipe right - previous slide
                setCurrentIndex(prev => Math.max(prev - 1, 0));
            }
        }
        
        setIsDragging(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setCurrentIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'ArrowRight') {
                setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slides.length]);

    return (
        <div className="horizontal-list">
        {slides.map(item => (
            <div key={item.id} className="list-item">
                <SlideView key={item.id} slide={item}/>
            </div>
        ))}
        </div>
    );

}

export default SlideList;
