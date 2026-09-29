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

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  imageUrl: string;
  images: string[];
  isNew: boolean;
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

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 11,
    name: 'Pasage Unisex T-shirt Siyah',
    category: 'T-Shirt',
    price: 195.00,
    oldPrice: 229.00,
    rating: 3.30,
    reviews: 603,
    imageUrl: 'https://cdn.dsmcdn.com/mnresize/400/600/ty1590/prod/QC/20241021/20/86463b2a-8060-38b8-a04a-f4d64ecb1f1b/1_org_zoom.jpg',
    images: [
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1590/prod/QC/20241021/20/86463b2a-8060-38b8-a04a-f4d64ecb1f1b/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1591/prod/QC/20241021/20/ab07c170-af85-3bea-8367-45c40e2c1339/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1590/prod/QC/20241021/20/df63f708-8fc9-313d-aacc-62464600d338/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1591/prod/QC/20241021/20/7a7c0bde-6d48-3292-b44c-68f910a92cb7/1_org_zoom.jpg'
    ],
    isNew: true
  },
  {
    id: 12,
    name: 'geenz manifacture Rio Siyah Yüksek Bel Dar Paça Skinny Power Likralı Kot Pantalon',
    category: 'Pantolon',
    price: 654.09,
    oldPrice: null,
    rating: 3.80,
    reviews: 633,
    imageUrl: 'https://cdn.dsmcdn.com/mnresize/400/600/ty1600/prod/QC/20241112/00/dcd83fa8-f39e-3c12-89a4-5ed0220941b5/1_org_zoom.jpg',
    images: [
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1600/prod/QC/20241112/00/dcd83fa8-f39e-3c12-89a4-5ed0220941b5/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1599/prod/QC/20241112/00/b3cd06e4-e3b6-3fc7-9a0b-5850ac041b7d/1_org_zoom.jpg'
    ],
    isNew: false
  },
  {
    id: 13,
    name: 'Dilvin 3683 Basic T-Shirt-Beyaz',
    category: 'T-Shirt',
    price: 541.49,
    oldPrice: 599.90,
    rating: 4.20,
    reviews: 6205,
    imageUrl: 'https://cdn.dsmcdn.com/mnresize/400/600/ty1671/prod/QC/20250503/07/8068ded6-4c72-3580-b1e7-a834da08db63/1_org_zoom.jpg',
    images: [
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1671/prod/QC/20250503/07/8068ded6-4c72-3580-b1e7-a834da08db63/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1672/prod/QC/20250503/07/27c4c958-8701-34cc-9454-d4219829f02c/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1671/prod/QC/20250503/07/18380c1a-7cc1-3887-be9a-9875712ccaea/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1673/prod/QC/20250503/07/e25c2397-3813-39f8-a5dd-f970bfa86524/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1672/prod/QC/20250503/07/9774c052-7825-3875-aeac-b04880147d79/1_org_zoom.jpg'
    ],
    isNew: false
  },
  {
    id: 14,
    name: 'Genel Markalar Minimal Kalp Baskılı Siyah Oversize Tshirt',
    category: 'T-Shirt',
    price: 163.27,
    oldPrice: 199.99,
    rating: 3.80,
    reviews: 1123,
    imageUrl: 'https://cdn.dsmcdn.com/mnresize/400/600/ty1522/product/media/images/prod/QC/20240903/19/e342be81-b304-3ad5-848b-016649ac153f/1_org_zoom.jpg',
    images: [
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1522/product/media/images/prod/QC/20240903/19/e342be81-b304-3ad5-848b-016649ac153f/1_org_zoom.jpg',
      'https://cdn.dsmcdn.com/mnresize/400/600/ty1521/product/media/images/prod/QC/20240903/19/b98d2002-0c0d-31e8-a5f2-27000512353b/1_org_zoom.jpg'
    ],
    isNew: true
  }
];
