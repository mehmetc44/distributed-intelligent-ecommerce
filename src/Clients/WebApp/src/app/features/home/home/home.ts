import { Component } from '@angular/core';
import { Slider } from '../slider/slider';
import { PopularCategories } from '../popular-categories/popular-categories';
import { FeaturedProducts } from '../featured-products/featured-products';

@Component({
  selector: 'app-home',
  imports: [Slider, PopularCategories, FeaturedProducts],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home { }
