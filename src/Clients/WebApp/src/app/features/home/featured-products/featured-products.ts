import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.html',
  styleUrls: ['./featured-products.css']
})
export class FeaturedProducts {
  products = [
    {
      id: 11,
      name: 'Pasage Unisex T-shirt Siyah',
      category: 'T-Shirt',
      price: 195.00,
      oldPrice: 229.00,
      rating: 3.30,
      reviews: 603,
      imageUrl: 'https://cdn.dsmcdn.com/mnresize/400/600/ty1590/prod/QC/20241021/20/86463b2a-8060-38b8-a04a-f4d64ecb1f1b/1_org_zoom.jpg',
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
      isNew: true
    }
  ];
  
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
