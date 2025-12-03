import { useState, useEffect, useRef } from 'react';
import type { SlideModel } from './SlideModel'
import "./SlideView.css"

interface SlideViewProps {
    slide: SlideModel;
}

function SlideView({ slide }: SlideViewProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setShouldAnimate(true);
                }
            },
            {
                threshold: 0.6, // 60% элемента должно быть видно
                rootMargin: '-10% 0px -10% 0px' // Игнорируем верхние и нижние 10%
            }
        );

        if (slideRef.current) {
            observer.observe(slideRef.current);
        }

        return () => {
            if (slideRef.current) {
                observer.unobserve(slideRef.current);
            }
        };
    }, []);

    const getTextPositionClass = () => {
        switch (slide.textPosition) {
            case 'top-center': return 'text-top-center';
            case 'top-left': return 'text-top-left';
            case 'top-right': return 'text-top-right';
            case 'bottom-center': return 'text-bottom-center';
            case 'bottom-left': return 'text-bottom-left';
            case 'bottom-right': return 'text-bottom-right';
            default: return 'text-center';
        }
    };

    return (
        <div className='slide' onClick={() => setIsVisible(!isVisible)} ref={slideRef}>
            <div className={`image-container`}>
                <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    style={{ 
                        filter: slide.blurLevel ?? 0 > 0 ? `blur(${slide.blurLevel ?? 0}px)` : 'none' 
                    }} 
                />
                <div className={`text-overlay ${getTextPositionClass()}`}>
                    {slide.title && (
                        <h3 className={shouldAnimate ? 'animate-in' : ''}>
                            {slide.title}
                        </h3>
                    )}
                    {slide.description && (
                        <p className={shouldAnimate ? 'animate-in' : ''}>
                            {slide.description}
                        </p>
                    )}
                </div>
            </div>

            {isVisible && (
                <div className="hidden-content">
                    Дополнительная информация (ID: {slide.id})
                </div>
            )}
        </div>
    );
}

export default SlideView;