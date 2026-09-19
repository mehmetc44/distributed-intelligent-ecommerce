import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORIES, SLIDER_ITEMS, Category, SliderItem } from '../data/seed-data';

@Injectable({
  providedIn: 'root'
})
export class Home {
  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

  getSliderItems(): Observable<SliderItem[]> {
    return of(SLIDER_ITEMS);
  }
}
