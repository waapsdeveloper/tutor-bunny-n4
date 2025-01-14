import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-teacher-welcome',
  templateUrl: './teacher-welcome.page.html',
  styleUrls: ['./teacher-welcome.page.scss'],
})
export class TeacherWelcomePage extends BasePage implements OnInit {

  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  activeIndex = 0;
  list = [
    {
      id: 1,
      image: '',
      heading: '',
      text: ''
    },
    {
      id: 2,
      image: '',
      heading: '',
      text: ''
    },
    {
      id: 3,
      image: '',
      heading: '',
      text: ''
    },
  ]

  constructor(injector:Injector, private cdr: ChangeDetectorRef) {
    super(injector)
   }

  ngOnInit() {
  }

  continue(){
    this.nav.push('/teacher-profile/teacher-profile-edit');    
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;

    this.cdr.detectChanges();
  }

}
