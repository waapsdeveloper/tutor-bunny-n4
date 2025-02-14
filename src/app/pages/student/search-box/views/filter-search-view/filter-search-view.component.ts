import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-filter-search-view',
  templateUrl: './filter-search-view.component.html',
  styleUrls: ['./filter-search-view.component.scss'],
})
export class FilterSearchViewComponent implements OnInit {
  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;
  view = 'course';
  activeIndex = 0;
  constructor(private events: EventsService, private nav: NavService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.events.subscribe(
      'tag-input-search-triggered',
      this.triggerSearchWithParams.bind(this)
    );
  }

  triggerSearchWithParams(data: any) {
    console.log('triggerSearch', data);
  }

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.changeToActiveIndex(0);
      // this.nav.pop('/tabs/student-dashboard/student-dashborad-courses');
    }
    if (view == 'teacher') {
      this.changeToActiveIndex(1);
      // this.nav.push('/tabs/student-dashboard/student-dashborad-teachers');
    }
    if (view == 'notes') {
      this.changeToActiveIndex(2);
      // this.nav.push('/tabs/student-dashboard/student-dashboard-study-material');
    }
    if (view == 'cart') {
      this.nav.push('/cart');
    }
  }
  changeToActiveIndex(index) {
    this.slides?.swiperRef?.slideTo(index);
  }
  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;

    if (this.activeIndex == 0) {
      this.toogleView('course');
    }

    if (this.activeIndex == 1) {
      this.toogleView('teacher');
    }

    if (this.activeIndex == 2) {
      this.toogleView('notes');
    }

    this.cdr.detectChanges();
  }
}
