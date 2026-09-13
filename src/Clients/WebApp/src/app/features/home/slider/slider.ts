import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home as HomeService } from '../../../core/services/home';
import { SliderItem } from '../../../core/data/seed-data';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class Slider implements OnInit, OnDestroy {
  homeService = inject(HomeService);
  sliderItems: SliderItem[] = [];
  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.homeService.getSliderItems().subscribe(data => {
      this.sliderItems = data;
      this.startSlider();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlider(): void {
    if (this.sliderItems.length > 0) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sliderItems.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.sliderItems.length) % this.sliderItems.length;
  }
}
