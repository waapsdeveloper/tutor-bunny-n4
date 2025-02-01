import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationsService } from 'src/app/services/notifications.service';
@Component({
  selector: 'app-menu-list-box',
  templateUrl: './menu-list-box.component.html',
  styleUrls: ['./menu-list-box.component.scss'],
})
export class MenuListBoxComponent extends BasePage implements OnInit {
  role;
  user;
  constructor(injector: Injector,
    private trails: GlobalTrialsService,
    private courses: GlobalCoursesService,
    private chats: ChatService,
    private notification: NotificationsService,

  ) {
    super(injector);
    this.initialize();
  }
  initialize() {
    this.role = localStorage.getItem('role');
    this.user = this.users.getUser();
    console.log(this.user)
  }
  ngOnInit() {

  }

  gotoProfile() {
    if (this.user.role_id == 2) {
      // this.nav.push('/teacher-profile');
      this.nav.push('/student-profile/student-profile-edit', {
        backUrl: '/tabs/menu',
        showBack: true,
      });
    } else {
      const params = {
        email: this.user.email,
      };
      this.nav.push('/teacher-profile', params);
    }
  }

  gotoCheckoutHistory(){
    this.nav.push('/checkout-history')
  }

  gotoPurchaseHistory(){
    this.nav.push('/purchase-history')
  }



  async logout() {

    this.events.publish('clear-all-services-data');
    this.chats.unRegisterPusherEvent();
    this.trails.unRegisterPusherEvent();
    this.courses.unRegisterPusherEvent();
    this.notification.unRegisterPusherEvent();
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.nav.pop('splash');
    await FirebaseAuthentication.signOut();
  }
}
