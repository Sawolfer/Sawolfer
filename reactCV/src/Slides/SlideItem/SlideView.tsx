import { useState } from 'react';
import type { SlideModel } from './SlideModel'
import "./SlideView.css"

interface SlideViewProps {
    slide: SlideModel;
}

function SlideView({ slide }: SlideViewProps ) {
    const [isVisible, setIsVisible] = useState(false)

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className='slide' onClick={handleClick}>
            <img src={slide.imageUrl} alt={slide.title} />
            {slide.title && <h3>{slide.title}</h3>}
            {slide.description && <p>{slide.description}</p>}

            {isVisible && (
                <div className="hidden-content">
                    Дополнительная информация (ID: {slide.id})
                </div>
            )}
        </div>
    )
}

export default SlideView;