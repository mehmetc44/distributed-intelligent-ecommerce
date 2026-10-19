import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { Home as HomeComponent } from './features/home/home/home';
import { ProductDetail } from './features/product-detail/product-detail';
import { ProductListing } from './features/product-listing/product-listing';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'products', component: ProductListing },
      { path: 'search', redirectTo: 'products', pathMatch: 'full' },
      { path: 'product/:id', component: ProductDetail }
    ]
  }
];
