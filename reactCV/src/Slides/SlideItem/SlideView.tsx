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

    return (
        <div className='slide' onClick={() => setIsVisible(!isVisible)} ref={slideRef}>
            <div className="image-container">
                <img src={slide.imageUrl} alt={slide.title} />
                <div className="text-overlay">
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