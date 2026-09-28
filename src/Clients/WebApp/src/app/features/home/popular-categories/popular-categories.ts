import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home as HomeService } from '../../../core/services/home';
import { Category } from '../../../core/data/seed-data';

@Component({
  selector: 'app-popular-categories',
  imports: [CommonModule],
  templateUrl: './popular-categories.html',
  styleUrls: ['./popular-categories.css']
})
export class PopularCategories implements OnInit {
  homeService = inject(HomeService);
  categories: Category[] = [];

  ngOnInit(): void {
    this.homeService.getCategories().subscribe(data => {
      // Sadece görseli olan popüler 8 kategoriyi al
      this.categories = data.filter(c => c.imageUrl).slice(0, 8);
    });
  }
}
