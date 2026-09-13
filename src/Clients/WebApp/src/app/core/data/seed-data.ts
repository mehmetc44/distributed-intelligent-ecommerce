export interface Category {
  id: number;
  name: string;
  icon?: string;
}

export interface SliderItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  linkText: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Sports' },
  { id: 4, name: 'Cosmetics' },
  { id: 5, name: 'Books' },
  { id: 6, name: 'Mom & Baby' },
  { id: 7, name: 'Groceries' },
  { id: 8, name: 'Toys' },
  { id: 9, name: 'Furniture' },
  { id: 10, name: 'Automotive' },
];

export const SLIDER_ITEMS: SliderItem[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf6d1736de?q=80&w=2000&auto=format&fit=crop',
    title: 'Yeni Nesil Elektronikler',
    description: 'En son teknoloji ürünlerinde dev indirimleri kaçırmayın.',
    linkText: 'Şimdi Alışverişe Başla'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop',
    title: 'Moda ve Giyimde Yeni Sezon',
    description: 'Yaz koleksiyonu raflardaki yerini aldı. Stilinizi yenileyin.',
    linkText: 'Koleksiyonu İncele'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop',
    title: 'Spor ve Outdoor Ekipmanları',
    description: 'Aksiyon dolu anlar için ihtiyacınız olan her şey.',
    linkText: 'Keşfet'
  }
];
