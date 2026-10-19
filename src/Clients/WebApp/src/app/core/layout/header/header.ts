import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import { Subscription, filter } from 'rxjs';
import { Home as HomeService } from '../../services/home';
import { Category } from '../../data/seed-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private homeService = inject(HomeService);
  private sanitizer = inject(DomSanitizer);

  searchQuery: string = '';
  drawerSearch: string = '';
  
  categories: Category[] = [];
  navbarCategories: Category[] = [];
  activeRootCategory: Category | null = null;
  
  isCategoryDrawerOpen: boolean = false;
  
  private routeSub?: Subscription;
  private navSub?: Subscription;

  ngOnInit(): void {
    // URL arama parametresini dinle
    this.routeSub = this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
    });

    // Sayfa değiştiğinde çekmeceyi otomatik kapat
    this.navSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeCategoryDrawer();
      });

    // Kategorileri yükle
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.navSub?.unsubscribe();
  }

  loadCategories(): void {
    this.homeService.getAllCategories().subscribe(data => {
      this.categories = data;
      // Navbar'da ilk 7 ana kategoriyi göster
      this.navbarCategories = data.slice(0, 7);
      if (data.length > 0 && !this.activeRootCategory) {
        this.activeRootCategory = data[0];
      }
    });
  }

  get filteredCategories(): Category[] {
    if (!this.drawerSearch.trim()) {
      return this.categories;
    }
    const q = this.drawerSearch.toLowerCase().trim();
    return this.categories.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.subCategories?.some(sub => 
        sub.name.toLowerCase().includes(q) ||
        sub.subCategories?.some(leaf => leaf.name.toLowerCase().includes(q))
      )
    );
  }

  toggleCategoryDrawer(): void {
    this.isCategoryDrawerOpen = !this.isCategoryDrawerOpen;
    if (this.isCategoryDrawerOpen && !this.activeRootCategory && this.categories.length > 0) {
      this.activeRootCategory = this.categories[0];
    }
  }

  openCategoryDrawer(): void {
    this.isCategoryDrawerOpen = true;
    if (!this.activeRootCategory && this.categories.length > 0) {
      this.activeRootCategory = this.categories[0];
    }
  }

  closeCategoryDrawer(): void {
    this.isCategoryDrawerOpen = false;
    this.drawerSearch = '';
  }

  selectRoot(cat: Category): void {
    this.activeRootCategory = cat;
  }

  navigateToCategory(categoryName: string): void {
    this.closeCategoryDrawer();
    this.router.navigate(['/products'], { queryParams: { category: categoryName } });
  }

  onSearch(): void {
    const q = this.searchQuery.trim();
    this.closeCategoryDrawer();
    if (q) {
      this.router.navigate(['/products'], { queryParams: { q } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  goHome(): void {
    this.searchQuery = '';
    this.closeCategoryDrawer();
    this.router.navigate(['/']);
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isCategoryDrawerOpen) {
      this.closeCategoryDrawer();
    }
  }

  getSanitizedSvg(svg?: string): SafeHtml | null {
    if (!svg) return null;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  getIconMaskStyle(url?: string): SafeStyle | null {
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  getIconType(name: string): string {
    const lower = name.toLowerCase();
    if (lower.includes('kadın')) return 'women';
    if (lower.includes('erkek')) return 'men';
    if (lower.includes('anne') || lower.includes('bebek') || lower.includes('çocuk')) return 'baby';
    if (lower.includes('ev') || lower.includes('mobilya')) return 'home';
    if (lower.includes('süpermarket')) return 'grocery';
    if (lower.includes('kozmetik')) return 'cosmetic';
    if (lower.includes('ayakkabı') || lower.includes('çanta')) return 'shoe';
    if (lower.includes('elektronik')) return 'electronic';
    if (lower.includes('spor')) return 'sport';
    if (lower.includes('kitap') || lower.includes('kırtasiye') || lower.includes('hobi')) return 'book';
    return 'default';
  }
}
