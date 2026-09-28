import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Slider } from '../slider/slider';
import { PopularCategories } from '../popular-categories/popular-categories';

@Component({
  selector: 'app-home',
  imports: [Sidebar, Slider, PopularCategories],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home { }
