import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-slider-photos',
  templateUrl: './slider-photos.component.html',
  styleUrls: ['./slider-photos.component.scss'],
})
export class SliderPhotosComponent {
  
  @Input() sliderImages: any[] = [];
  activeIndex = 0;
  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  constructor( private cdr: ChangeDetectorRef) {}


  get svgWidth(): number {
    return this.sliderImages.length * 10 + 8; // Dynamic width based on the number of circles
  }

  get viewBox(): string {
    return `0 0 ${this.svgWidth} 16`; // Dynamic viewBox to match the SVG's width
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;

    this.cdr.detectChanges();
  }
}
