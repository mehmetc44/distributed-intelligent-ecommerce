import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FEATURED_PRODUCTS, Product } from '../../../core/data/seed-data';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.html',
  styleUrls: ['./featured-products.css']
})
export class FeaturedProducts implements OnInit {
  baseProducts = FEATURED_PRODUCTS;
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  currentPage = 0;
  pageSize = 20;

  constructor(private router: Router) {}

  ngOnInit() {
    // Toplam 100 adet ürün olacak şekilde havuz oluştur (4 ana ürünün kopyaları)
    for (let i = 0; i < 100; i++) {
      const baseProduct = this.baseProducts[i % this.baseProducts.length];
      this.allProducts.push({ ...baseProduct, id: baseProduct.id + (i * 100) });
    }
    this.loadMore();
  }

  loadMore() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const nextBatch = this.allProducts.slice(startIndex, endIndex);
    
    this.displayedProducts = [...this.displayedProducts, ...nextBatch];
    this.currentPage++;
  }
  
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
