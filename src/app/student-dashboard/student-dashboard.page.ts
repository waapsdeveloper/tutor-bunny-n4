import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavService } from '../services/nav.service';
import { NetworkService } from '../services/network.service';
import { BasePage } from '../base-page/base-page';
import { IonContent } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { FavCoursesPage } from '../fav-courses/fav-courses.page';

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
  showLiked = false;
  // @ViewChild('content', { static: true }) content: IonContent;

  constructor(injector: Injector, public authService: AuthenticationService, private fcm: FirebaseService) {
    super(injector)
    this.initialize()
 
  }

  ngOnInit() {
    this.fcm.setTokenToServer();
    this.events.subscribe('get-user-after-submit-form', (data) => {
      this.initialize()

    });

 

    

    this.getCountOfLikes()
  }

  ionViewWillEnter() {
    this.initialize()
  }
  gotoNotification() {
    this.nav.push('notifications', {
      backUrl: '/tabs/student-dashboard', showBack: true
    })
  }

  async initialize() {

    this.events.subscribe('update-fav-dot-d', (data) => {
      console.log("sdadasdsada");
      
      console.log(data);
      this.getCountOfLikes()
    });

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

    if (this.user && this.user.student && this.user.student.country && this.user.student.country.name) {
      this.country = this.user.student.country.name;
    }


    this.showWarning = await this.profiles.isProfileCompleted(this.user) as any;

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

  async showFavCourse() {
    let res = await this.modals.present(FavCoursesPage)

    this.events.publish('Update-Fv-Screen', {
      res
      
    });

    this.getCountOfLikes()



    // this.showLiked = !this.showLiked;
    // this.events.publish("show-list-of-fav-courses", {
    //   liked: this.showLiked
    // })
  }

  async getCountOfLikes() {
    let obj = {
      liked: true
    }

    const res = await this.network.getAllCourses(obj) as any;
    const data = res.result;
    const d = data.data;
    this.showLiked = d.length > 0;


  }

}
