export interface Category {
  id: number;
  name: string;
  parentId?: number | null;
  level?: number;
  fullPath?: string;
  icon?: string;
  iconUrl?: string;
  iconSvg?: string;
  imageUrl?: string;
  subCategories?: Category[];
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
    id: 4, 
    name: 'Kadın',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/woman.svg',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 30,
        name: 'Giyim',
        subCategories: [
          { id: 259, name: 'Elbise' },
          { id: 251, name: 'Tişört' },
          { id: 282, name: 'Kot Pantolon' },
          { id: 326, name: 'Etek' },
          { id: 203, name: 'Ceket & Yelek' },
          { id: 304, name: 'Sweatshirt' }
        ]
      },
      {
        id: 50,
        name: 'Aksesuar & Çanta',
        subCategories: [
          { id: 501, name: 'Omuz Çantası' },
          { id: 502, name: 'Kol Saati' },
          { id: 503, name: 'Güneş Gözlüğü' },
          { id: 504, name: 'Cüzdan' },
          { id: 505, name: 'Takı & Mücevher' }
        ]
      },
      {
        id: 117,
        name: 'Kozmetik',
        subCategories: [
          { id: 601, name: 'Kadın Parfüm' },
          { id: 602, name: 'Ruj & Dudak Parlatıcı' },
          { id: 603, name: 'Yüz Serumu' },
          { id: 604, name: 'Göz Makyajı' }
        ]
      },
      {
        id: 96,
        name: 'Ayakkabı',
        subCategories: [
          { id: 701, name: 'Topuklu Ayakkabı' },
          { id: 702, name: 'Sneaker' },
          { id: 703, name: 'Babet' },
          { id: 704, name: 'Sandalet' },
          { id: 705, name: 'Bot & Çizme' }
        ]
      },
      {
        id: 161,
        name: 'Ev & İç Giyim',
        subCategories: [
          { id: 801, name: 'Pijama Takımı' },
          { id: 802, name: 'Gecelik' },
          { id: 803, name: 'Sütyen' },
          { id: 804, name: 'İç Çamaşırı Takımı' }
        ]
      },
      {
        id: 121,
        name: 'Spor & Outdoor',
        subCategories: [
          { id: 901, name: 'Spor Tayt' },
          { id: 902, name: 'Spor Sütyeni' },
          { id: 903, name: 'Eşofman Takımı' },
          { id: 904, name: 'Koşu Ayakkabısı' }
        ]
      }
    ]
  },
  { 
    id: 6, 
    name: 'Erkek',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/man.svg',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 61,
        name: 'Giyim',
        subCategories: [
          { id: 611, name: 'Tişört' },
          { id: 612, name: 'Gömlek' },
          { id: 613, name: 'Kot Pantolon' },
          { id: 614, name: 'Ceket & Blazer' },
          { id: 615, name: 'Sweatshirt' }
        ]
      },
      {
        id: 62,
        name: 'Ayakkabı',
        subCategories: [
          { id: 621, name: 'Sneaker' },
          { id: 622, name: 'Klasik Ayakkabı' },
          { id: 623, name: 'Bot' },
          { id: 624, name: 'Spor Ayakkabı' }
        ]
      },
      {
        id: 63,
        name: 'Aksesuar',
        subCategories: [
          { id: 631, name: 'Kol Saati' },
          { id: 632, name: 'Cüzdan & Kartlık' },
          { id: 633, name: 'Kemer' },
          { id: 634, name: 'Güneş Gözlüğü' }
        ]
      }
    ]
  },
  { 
    id: 1, 
    name: 'Anne & Çocuk',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/baby.svg',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 11,
        name: 'Bebek Bakım',
        subCategories: [
          { id: 111, name: 'Bebek Bezi' },
          { id: 112, name: 'Islak Mendil' },
          { id: 113, name: 'Biberon & Emzik' },
          { id: 114, name: 'Bebek Şampuanı' }
        ]
      },
      {
        id: 12,
        name: 'Bebek Giyim',
        subCategories: [
          { id: 121, name: 'Zıbın & Body' },
          { id: 122, name: 'Tulum' },
          { id: 123, name: 'Bebek Pijama' }
        ]
      },
      {
        id: 13,
        name: 'Oyuncak',
        subCategories: [
          { id: 131, name: 'Eğitici Oyuncaklar' },
          { id: 132, name: 'Peluş Oyuncaklar' },
          { id: 133, name: 'Akülü Araba' }
        ]
      }
    ]
  },
  { 
    id: 8, 
    name: 'Ev & Mobilya',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/armchair.svg',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 81,
        name: 'Mobilya',
        subCategories: [
          { id: 811, name: 'Koltuk Takımı' },
          { id: 812, name: 'Çalışma Masası' },
          { id: 813, name: 'Kitaplık' },
          { id: 814, name: 'Yatak & Baza' }
        ]
      },
      {
        id: 82,
        name: 'Ev Tekstili',
        subCategories: [
          { id: 821, name: 'Nevresim Takımı' },
          { id: 822, name: 'Yastık & Yorgan' },
          { id: 823, name: 'Halı & Kilim' },
          { id: 824, name: 'Perde' }
        ]
      },
      {
        id: 83,
        name: 'Mutfak',
        subCategories: [
          { id: 831, name: 'Tencere & Tava Seti' },
          { id: 832, name: 'Yemek Takımı' },
          { id: 833, name: 'Bıçak Seti' }
        ]
      }
    ]
  },
  { 
    id: 15, 
    name: 'Süpermarket',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/shopping-cart.svg',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 151,
        name: 'Temel Gıda',
        subCategories: [
          { id: 1511, name: 'Sıvı Yağ' },
          { id: 1512, name: 'Bakliyat' },
          { id: 1513, name: 'Un & Şeker' },
          { id: 1514, name: 'Makarna' }
        ]
      },
      {
        id: 152,
        name: 'Deterjan & Temizlik',
        subCategories: [
          { id: 1521, name: 'Çamaşır Deterjanı' },
          { id: 1522, name: 'Bulaşık Tableti' },
          { id: 1523, name: 'Yüzey Temizleyici' }
        ]
      }
    ]
  },
  { 
    id: 9, 
    name: 'Kozmetik',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/sparkles.svg',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 91,
        name: 'Parfüm & Deodorant',
        subCategories: [
          { id: 911, name: 'Kadın Parfüm' },
          { id: 912, name: 'Erkek Parfüm' },
          { id: 913, name: 'Deodorant & Roll-on' }
        ]
      },
      {
        id: 92,
        name: 'Cilt Bakımı',
        subCategories: [
          { id: 921, name: 'Yüz Serumu' },
          { id: 922, name: 'Nemlendirici Krem' },
          { id: 923, name: 'Güneş Kremi' }
        ]
      },
      {
        id: 93,
        name: 'Makyaj',
        subCategories: [
          { id: 931, name: 'Ruj' },
          { id: 932, name: 'Fondöten' },
          { id: 933, name: 'Maskara' }
        ]
      }
    ]
  },
  { 
    id: 18, 
    name: 'Ayakkabı & Çanta',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline/shoe.svg',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 181,
        name: 'Kadın Ayakkabı',
        subCategories: [
          { id: 1811, name: 'Sneaker' },
          { id: 1812, name: 'Topuklu Ayakkabı' },
          { id: 1813, name: 'Bot & Çizme' }
        ]
      },
      {
        id: 182,
        name: 'Erkek Ayakkabı',
        subCategories: [
          { id: 1821, name: 'Sneaker' },
          { id: 1822, name: 'Klasik Ayakkabı' },
          { id: 1823, name: 'Bot' }
        ]
      },
      {
        id: 183,
        name: 'Çanta',
        subCategories: [
          { id: 1831, name: 'Sırt Çantası' },
          { id: 1832, name: 'Omuz Çantası' },
          { id: 1833, name: 'Cüzdan' }
        ]
      }
    ]
  },
  { 
    id: 5, 
    name: 'Elektronik',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/monitor.svg',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 119,
        name: 'Bilgisayar & Tablet',
        subCategories: [
          { id: 1191, name: 'Dizüstü Bilgisayar' },
          { id: 1192, name: 'Tablet' },
          { id: 1193, name: 'Oyuncu Bilgisayarı' },
          { id: 1194, name: 'Monitör' }
        ]
      },
      {
        id: 62,
        name: 'Telefon & Aksesuar',
        subCategories: [
          { id: 621, name: 'Akıllı Telefon' },
          { id: 622, name: 'Telefon Kılıfı' },
          { id: 623, name: 'Hızlı Şarj Aleti' }
        ]
      },
      {
        id: 72,
        name: 'Kulaklık & Ses',
        subCategories: [
          { id: 721, name: 'Bluetooth Kulaklık' },
          { id: 722, name: 'Kulaküstü Kulaklık' },
          { id: 723, name: 'Bluetooth Hoparlör' }
        ]
      },
      {
        id: 32,
        name: 'Beyaz Eşya',
        subCategories: [
          { id: 321, name: 'Buzdolabı' },
          { id: 322, name: 'Çamaşır Makinesi' },
          { id: 323, name: 'Bulaşık Makinesi' }
        ]
      }
    ]
  },
  { 
    id: 13, 
    name: 'Spor & Outdoor',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/dumbbell.svg',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 131,
        name: 'Fitness & Salon',
        subCategories: [
          { id: 1311, name: 'Dambıl & Ağırlık' },
          { id: 1312, name: 'Yoga Matı' },
          { id: 1313, name: 'Direnç Bandı' }
        ]
      },
      {
        id: 132,
        name: 'Kamp & Doğa',
        subCategories: [
          { id: 1321, name: 'Çadır' },
          { id: 1322, name: 'Uyku Tulumu' },
          { id: 1323, name: 'Termos' },
          { id: 1324, name: 'Kamp Sandalyesi' }
        ]
      },
      {
        id: 133,
        name: 'Spor Giyim',
        subCategories: [
          { id: 1331, name: 'Koşu Ayakkabısı' },
          { id: 1332, name: 'Spor Tişört' },
          { id: 1333, name: 'Eşofman Altı' }
        ]
      }
    ]
  },
  { 
    id: 2, 
    name: 'Kitap & Kırtasiye & Hobi',
    iconUrl: 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/book-open.svg',
    imageUrl: 'https://images.unsplash.com/photo-1495640388908-05fd9218f705?q=80&w=300&auto=format&fit=crop',
    subCategories: [
      {
        id: 21,
        name: 'Kitaplar',
        subCategories: [
          { id: 211, name: 'Edebiyat & Roman' },
          { id: 212, name: 'Kişisel Gelişim' },
          { id: 213, name: 'Tarih & Felsefe' },
          { id: 214, name: 'Çocuk Kitapları' }
        ]
      },
      {
        id: 22,
        name: 'Kırtasiye',
        subCategories: [
          { id: 221, name: 'Defterler' },
          { id: 222, name: 'Kalem Setleri' },
          { id: 223, name: 'Ajanda & Planlayıcı' }
        ]
      },
      {
        id: 23,
        name: 'Hobi & Oyun',
        subCategories: [
          { id: 231, name: 'Puzzle' },
          { id: 232, name: 'Kutu Oyunları' },
          { id: 233, name: 'Maket & Model' }
        ]
      }
    ]
  }
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
