
export interface SlideModel {
    id: number;
    title?: string;
    description?: string;
    imageUrl: string;
}

export const mockSlides: SlideModel[] = [
  {
    id: 1,
    title: "Карточка 1",
    description: "Описание 1",
    imageUrl: "/image2.jpg"
  },
  {
    id: 2, 
    title: "Карточка 2",
    description: "Описание 2",
    imageUrl: "/image2.jpg"
  }
];