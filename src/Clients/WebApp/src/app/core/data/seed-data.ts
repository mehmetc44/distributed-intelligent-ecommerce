export interface Category {
  id: number;
  name: string;
  icon?: string;
  imageUrl?: string;
  subCategories?: { id: number, name: string }[];
}

export interface SliderItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  linkText: string;
}

export const CATEGORIES: Category[] = [
  { 
    id: 1, 
    name: 'Elektronik',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=200&auto=format&fit=crop',
    subCategories: [
      { id: 101, name: 'Dizüstü & Masaüstü' },
      { id: 102, name: 'Telefon & Tabletler' },
      { id: 103, name: 'Fotoğraf & Kamera' },
      { id: 104, name: 'Ses & Kulaklık' }
    ]
  },
  { 
    id: 2, 
    name: 'Giyim',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop',
    subCategories: [
      { id: 201, name: "Erkek Giyim" },
      { id: 202, name: "Kadın Giyim" },
      { id: 203, name: "Çocuk Giyim" },
      { id: 204, name: 'Ayakkabı & Çanta' }
    ]
  },
  { 
    id: 3, 
    name: 'Spor',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=200&auto=format&fit=crop',
    subCategories: [
      { id: 301, name: 'Fitness & Salon' },
      { id: 302, name: 'Kamp & Doğa' },
      { id: 303, name: 'Bisiklet' }
    ]
  },
  { id: 4, name: 'Kozmetik', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop' },
  { id: 5, name: 'Kitaplar', imageUrl: 'https://images.unsplash.com/photo-1495640388908-05fd9218f705?q=80&w=200&auto=format&fit=crop' },
  { id: 6, name: 'Anne & Bebek', imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=200&auto=format&fit=crop' },
  { id: 7, name: 'Süpermarket', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop' },
  { id: 8, name: 'Oyuncak', imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=200&auto=format&fit=crop' },
  { id: 9, name: 'Mobilya', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=200&auto=format&fit=crop' },
  { id: 10, name: 'Otomotiv', imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=200&auto=format&fit=crop' },
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
