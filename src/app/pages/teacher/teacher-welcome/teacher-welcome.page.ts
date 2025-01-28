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
      image: 'assets/svg/teacher-complete.svg',
      heading: 'Welcome to Tutor Bunny.',
      text: 'Submit the application form to join <br> Tutor bunny as a Teacher and reate courses <br> and upload study notes '
    },
    {
      id: 2,
      image: 'assets/svg/2ndcopy.svg',
      heading: '',
      text: 'Once the profile is approved by the admin, get <br> connected to your students, chat with them and <br> provide trial sessions'
    },
    {
      id: 3,
      image: 'assets/svg/3rdcopy.svg',
      heading: '',
      text: 'Create and upload study notes, materials of your <br> subject of interests and sell online to students'
    },
  ]

  constructor(injector:Injector) {
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
