import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { SwiperComponent } from 'swiper/angular';
@Component({
  selector: 'app-list-search-view',
  templateUrl: './list-search-view.component.html',
  styleUrls: ['./list-search-view.component.scss'],
})
export class ListSearchViewComponent  implements OnInit {
  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;
  view = 'course';
  activeIndex = 0;

  selectedKeyword: any = null;

  constructor(private events: EventsService, private nav: NavService,private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    console.log('filter-search-view');
    this.events.subscribe('tag-input-search-triggered',this.triggerSearchWithParams.bind(this), false);


  }

  triggerSearchWithParams(params) {
    console.log('triggerSearch', params);
    this.selectedKeyword = params;
    // this.updateViewDetails({
    //   search: params.text,
    // });
    // this.cdr.detectChanges();
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
