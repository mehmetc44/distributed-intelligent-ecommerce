import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home as HomeService } from '../../../core/services/home';
import { Category } from '../../../core/data/seed-data';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit {
  homeService = inject(HomeService);
  categories: Category[] = [];

  ngOnInit(): void {
    this.homeService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
