import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  activeIndex = 0;
  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;

  constructor(private nav: NavService, private cdr: ChangeDetectorRef) { }

  // start
  view = 'course';

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.changeToActiveIndex(0);
      // this.nav.push('favorites/fav-courses');
    }
    if (view == 'notes'){
      this.changeToActiveIndex(1);
      // this.nav.push('favorites/fav-material');
    }
  }

  

  changeToActiveIndex(index) {
    this.slides?.swiperRef?.slideTo(index);
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;
    this.cdr.detectChanges();
  }
  
}
