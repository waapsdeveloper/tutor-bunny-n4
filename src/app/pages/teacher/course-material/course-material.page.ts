import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { SwiperComponent } from 'swiper/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.page.html',
  styleUrls: ['./course-material.page.scss'],
})
export class CourseMaterialPage implements AfterViewInit{

  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;
  view = 'course';
  activeIndex = 0;
  params;

  constructor(private nav: NavService, private cdr: ChangeDetectorRef , private activatedRoute:ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.params = this.activatedRoute.snapshot.paramMap.get('view');

  console.log(this.params , "params")
    this.toogleView('course');
  }

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.changeToActiveIndex(0);
    }
    if (view == 'notes'){
      this.changeToActiveIndex(1);
    }
  }
  // end

  goback(){
    this.nav.pop();
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
