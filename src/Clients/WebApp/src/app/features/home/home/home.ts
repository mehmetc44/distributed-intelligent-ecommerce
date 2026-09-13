import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Slider } from '../slider/slider';

@Component({
  selector: 'app-home',
  imports: [Sidebar, Slider],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home { }
