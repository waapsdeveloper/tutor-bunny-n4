import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss'],
})
export class FavCoursesPage extends BasePage implements OnInit {

  user;
  displayName: string = '';
  country;
  showWarning = false;
  flag;
  showLiked = false;
  // @ViewChild('content', { static: true }) content: IonContent;

  constructor(injector: Injector, public authService: AuthenticationService, private fcm: FirebaseService) {
    super(injector)
    this.initialize()
  }

  ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.initialize()
  }
  gotoNotification() {
    this.nav.push('notifications')
  }

  async initialize() {
    this.user = this.users.getUser();
    console.log(this.user, "dfsfsd");
    
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
    console.log(this.showWarning, "ffsfsdfsdf");
    
    this.events.publish('is-student-profile-completed', this.showWarning);
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

  showFavCourse() {

    this.nav.push('/tabs/fav-courses')

    // this.showLiked = !this.showLiked;
    // this.events.publish("show-list-of-fav-courses", {
    //   liked: this.showLiked
    // })
  }

}
