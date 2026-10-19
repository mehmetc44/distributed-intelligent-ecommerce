import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CATEGORIES, SLIDER_ITEMS, Category, SliderItem } from '../data/seed-data';

@Injectable({
  providedIn: 'root'
})
export class Home {
  private http = inject(HttpClient);
  // Catalog API doğrudan portu (veya Gateway üzerinden /api/catalog/categories)
  private apiUrl = 'http://localhost:5205/categories';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/popular`).pipe(
      catchError(err => {
        console.warn('Catalog API categories fetch failed, using fallback mock data:', err);
        return of(CATEGORIES);
      })
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(err => {
        console.warn('Catalog API all categories fetch failed, using fallback mock data:', err);
        return of(CATEGORIES);
      })
    );
  }

  getSliderItems(): Observable<SliderItem[]> {
    return of(SLIDER_ITEMS);
  }
}
