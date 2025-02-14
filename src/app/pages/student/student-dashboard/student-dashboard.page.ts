import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage implements AfterViewInit {


  activeIndex = 0;
  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;
  
  user$;  
  view = 'course';
  lastSegment: string;


  constructor(private nav: NavService, private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit(): void {
    this.toogleView('course');
  }



  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.changeToActiveIndex(0)
      // this.nav.pop('/tabs/student-dashboard/student-dashborad-courses');
    }
    if (view == 'teacher') {
      this.changeToActiveIndex(1)
      // this.nav.push('/tabs/student-dashboard/student-dashborad-teachers');
    }
    if (view == 'notes'){
      this.changeToActiveIndex(2)
      // this.nav.push('/tabs/student-dashboard/student-dashboard-study-material');
    }
    if (view == 'cart'){
      this.nav.push('/cart');
    }

  }

  updateProfile($event) {
    this.nav.push('/student-profile/student-profile-edit', {
      backUrl: '/tabs/student-dashboard',
      showBack: true,
    });
  }
  
  gotoNotification() {
    this.nav.push('notifications', {
      backUrl: '',
      showBack: true,
    });
  }

  changeToActiveIndex(index) {
    this.slides?.swiperRef?.slideTo(index);
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;

    if(this.activeIndex == 0){
      this.toogleView('course');
    }

    if(this.activeIndex == 1){
      this.toogleView('teacher');
    }

    if(this.activeIndex == 2){
      this.toogleView('notes');
    }


    this.cdr.detectChanges();
  }

  
}
