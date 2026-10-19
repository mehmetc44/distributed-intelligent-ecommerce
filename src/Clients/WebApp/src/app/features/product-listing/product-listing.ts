import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FEATURED_PRODUCTS, CATEGORIES, Product, Category } from '../../core/data/seed-data';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-listing.html',
  styleUrls: ['./product-listing.css']
})
export class ProductListing implements OnInit, OnDestroy {
  searchQuery: string = '';
  selectedCategory: string = 'all';
  pageTitle: string = 'Tüm Ürünleri Keşfet';
  
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  categories: Category[] = CATEGORIES;
  
  sortBy: 'smart' | 'price-asc' | 'price-desc' | 'rating' = 'smart';
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Sayfayı zengin doldurmak için mock ürün havuzu (12 adet kart)
    this.allProducts = [
      ...FEATURED_PRODUCTS,
      ...FEATURED_PRODUCTS.map(p => ({ ...p, id: p.id + 100 })),
      ...FEATURED_PRODUCTS.map(p => ({ ...p, id: p.id + 200 }))
    ];

    // URL parametrelerini dinle (?q= ve ?category=)
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.selectedCategory = params['category'] || 'all';
      this.updateTitle();
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  updateTitle(): void {
    if (this.searchQuery.trim()) {
      this.pageTitle = `"${this.searchQuery}" için sonuçlar`;
    } else if (this.selectedCategory !== 'all') {
      this.pageTitle = `${this.selectedCategory} Koleksiyonu`;
    } else {
      this.pageTitle = 'Tüm Ürünleri Keşfet';
    }
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    // Kategori Filtresi
    if (this.selectedCategory !== 'all') {
      const catLower = this.selectedCategory.toLowerCase();
      result = result.filter(p => 
        p.category.toLowerCase().includes(catLower) ||
        p.name.toLowerCase().includes(catLower)
      );
    }

    // Arama Kelimesi Filtresi
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      const matched = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
      // Kullanıcı ne ararsa arasın sonuçsuz kalmasın, eşleşen yoksa tümünü göster
      result = matched.length > 0 ? matched : result;
    }

    // Sıralama
    if (this.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    this.displayedProducts = result;
  }

  onCategorySelect(categoryName: string): void {
    this.selectedCategory = categoryName;
    const queryParams: Record<string, string> = {};
    if (this.searchQuery) queryParams['q'] = this.searchQuery;
    if (categoryName !== 'all') queryParams['category'] = categoryName;

    this.router.navigate(['/products'], { queryParams });
  }

  onSortChange(): void {
    this.applyFilters();
  }

  removeSearchQuery(): void {
    this.searchQuery = '';
    const queryParams: Record<string, string> = {};
    if (this.selectedCategory !== 'all') {
      queryParams['category'] = this.selectedCategory;
    }
    this.router.navigate(['/products'], { queryParams });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.router.navigate(['/products']);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}
