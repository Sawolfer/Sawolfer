
export interface SlideModel {
  id: number;
  title?: string;
  description?: string;
  imageUrl: string;
  
  blurLevel?: number;
  textPosition?: 'center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';
}

export const mockSlides: SlideModel[] = [
  {
    id: 1,
    title: "Карточка 1",
    description: "Описание 1",
    imageUrl: "/fluently_zero.png"
  },
  {
    id: 2, 
    title: "Card 2",
    description: "Description 2",
    imageUrl: "/luminia_zero.png"
  },
  {
    id: 3, 
    title: "Card 2",
    description: "Description 2",
    imageUrl: "/luminia.png"
  },
  {
    id: 4, 
    title: "Card 2",
    description: "Description 2",
    imageUrl: "/luminia_zero.png"
  }
];