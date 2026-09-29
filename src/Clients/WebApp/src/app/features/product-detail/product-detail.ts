import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FEATURED_PRODUCTS, Product } from '../../core/data/seed-data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  selectedImageIndex = 0;
  quantity = 1;
  activeTab: 'description' | 'specs' | 'reviews' = 'description';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = FEATURED_PRODUCTS.find(p => p.id === id) || FEATURED_PRODUCTS[id % FEATURED_PRODUCTS.length] || null;
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  setTab(tab: 'description' | 'specs' | 'reviews') {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getHighResImageUrl(url: string): string {
    if (!url) return '';
    // Trendyol CDN URL'lerindeki boyutu 400x600'den 1200x1800'e çıkararak yüksek çözünürlük elde ediyoruz
    return url.replace('mnresize/400/600', 'mnresize/1200/1800');
  }
}
