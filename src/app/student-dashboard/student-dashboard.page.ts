import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavService } from '../services/nav.service';
import { NetworkService } from '../services/network.service';
import { BasePage } from '../base-page/base-page';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage extends BasePage implements OnInit {

  user;
  displayName: string = '';
  country;
  showWarning = false;
  flag;
  @ViewChild('content', { static: true }) content: IonContent;

  constructor(injector: Injector, public authService: AuthenticationService,) {
    super(injector)
    this.initialize()
  }

  ngOnInit() {
    this.events.subscribe('get-user-after-submit-form', (data) => {
      this.initialize()

    })
  }

  ionViewWillEnter() {
    this.initialize()
  }


  async initialize() {
    this.user = this.users.getUser();
    let obj = {
      email: this.user.email,
    };
    let res = await this.network.getUserByEmail(obj);
    if (res) {
      this.users.setUser(res.user);
      this.user = this.users.getUser();
      this.flag = this.getFlag();
    }

    this.country = this.user.student.country.name;
    console.log(this.country);
    

    this.showWarning = await this.profiles.isProfileCompleted(this.user) as any;
    this.displayName = this.utility.splitName(this.user.name).first_name;

  }
  getFlag() {
    if (this.user && this.user.student && this.user.student.country) {
      const flag = this.user.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }



  updateProfile() {
    this.nav.push('/student-profile/student-profile-edit', {
      backUrl: '/tabs/student-dashboard', showBack: true
    });
  }

  async onScroll(event: any) {

    const scrollElement = await this.content.getScrollElement();
    if (
      scrollElement.scrollTop ===
      scrollElement.scrollHeight - scrollElement.clientHeight
    ) {
      console.info('max bottom was reached!');

      return;
    }

    let startY = event.detail.startY;
    let currentY = event.detail.currentY;


    const diff = startY - currentY;
    if (diff != 0 && startY < currentY) {
      localStorage.setItem('efr', 'hide');
    }

    if (diff != 0 && startY > currentY) {
      localStorage.setItem('efr', 'show');
    }

  }

  private isThrottled: boolean = false;
  onScrollEnd(event: any) {
    if (this.isThrottled) {
      return;
    }

    this.isThrottled = true;
    this.events.publish('page-scroll-event-end', {
      showTabs: false
    });

    setTimeout(() => {
      this.isThrottled = false;
    }, 800); // 2 seconds
  }

}
