import SlideView from '../SlideItem/SlideView';
import type { SlideModel } from '../SlideItem/SlideModel';

import "./SlidesStackView.css"

interface SlideListProps {
    slides: SlideModel[];
}

function SlideList({ slides }: SlideListProps) {
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
