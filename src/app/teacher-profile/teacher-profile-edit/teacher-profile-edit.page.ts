import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-teacher-profile-edit',
  templateUrl: './teacher-profile-edit.page.html',
  styleUrls: ['./teacher-profile-edit.page.scss'],
})
export class TeacherProfileEditPage implements OnInit {
  swiperModules = [IonicSlides];
  @ViewChild('slides', { static: false }) slides: any;

  constructor() { }

  ngOnInit() { }

  selectedCountry(event) {
    console.log(event);
  }

  async onSlideChange() {
    // const activeIndex = await this.slides.getActiveIndex();
    // console.log("Active index:", activeIndex);
    this.slides?.nativeElement.swiper.slideTo(1, false, false);
  }
}
