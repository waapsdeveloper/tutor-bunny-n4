import { Component, Injector, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from '../base-page/base-page';
import { TrailMessageComponent } from '../student-dashboard/rec-courses/course-list/trail-message/trail-message.component';
import { AlertController } from '@ionic/angular';
import { GlobalCoursesService } from '../services/global-courses.service';
import { MyFavoritesService } from '../services/my-favorites.service';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.page.html',
  styleUrls: ['./student-course-detail.page.scss'],
})
export class StudentCourseDetailPage extends BasePage  { // implements OnInit
  data;
  params;
  backUrl;
  displayName
  course_Id;
  techerTitle;
  language;
  capacity;
  techerImg;
  loading = false;
  description;
  duration;
  mode_type;
  isExpanded = false;
  title;
  serial_number;
  created_at;
  image;
  price;
  from_age;
  to_age;
  country;
  startTime;
  flag;
  endTime;
  updated_at;
  schedules;
  acheduleTime;
  showFavValue = false;

  constructor(injector: Injector, public globalCourses: GlobalCoursesService, public favService: MyFavoritesService) {
    super(injector)
  }



  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.id) {
      this.course_Id = this.params.id;
    }

    this.callApi();
    // setTimeout(() => {
    //   this.isTrailReq()
    // }, 200);
  }



  async callApi() {

    let res = await this.globalCourses.getcourseById(this.course_Id) as any;
    this.data = res;
    this.events.publish('data-for-other-corses', this.data)
    this.title = this.data.title;
    this.capacity = this.data.capacity;
    this.mode_type = this.data.mode_type;
    this.description = this.data.description;
    this.language = this.data.language.name;
    this.from_age = this.data.from_age;
    this.to_age = this.data.to_age;
    this.displayName = this.utility.splitName(this.data.user.name).first_name;
    this.flag = this.getFlag();
    this.duration = this.data.duration;
    this.serial_number = this.data.serial_number;
    this.price = this.data.price;
    this.schedules = this.data.schedules;
    this.acheduleTime = this.schedules;
    this.created_at = this.data.created_at;
    this.techerTitle = this.data.user.teacher.title
    this.image = this.data.image;
    // if (this.data.trial) {
    //   this.trial = this.data.trial.status;
    // }
    this.techerImg = this.data.user.image
    this.country = this.data.user.teacher.country.name
    this.updated_at = this.data.updated_at;
    const startTime = this.acheduleTime.start_date;
    const endTime = this.acheduleTime.end_date;
    this.startTime = moment(startTime).format('hh:mm a');
    this.endTime = moment(endTime).format('hh:mm a');

    this.showFavValue = this.data.is_liked_by_me;
  }

  // async addToFav() {


  //   let user = this.users.getUser()
  //   let obj = {
  //     user_id: user.id,
  //     course_id: this.data.id
  //   }
  //   const res = await this.network.addCourseFav(obj)

  //   this.events.publish('show-list-of-fav-courses')
  //   this.callApi();
  // }

  // async removeFromFav() {
  //   let user = this.users.getUser()
  //   let obj = {
  //     user_id: user.id,
  //     course_id: this.data.id
  //   }
  //   const res = await this.network.removeCourseFav(obj)


  //   this.events.publish("show-list-of-fav-courses", {

  //   })
  //   this.callApi();

  // }

  async addToFav() {

    let user = this.users.getUser();

    this.data.is_liked_by_me = true;
    this.showFavValue = true;
    this.favService.addFavorite(this.data, user);

  }

  async removeToFav() {
    let user = this.users.getUser()

    this.data.is_liked_by_me = false;
    this.showFavValue = false;
    this.favService.removeFavorite(this.data, user);


  }



  getFlag() {
    if (this.data && this.data.user.teacher && this.data.user.teacher.country) {
      const flag = this.data.user.teacher.country.iso2;

      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  goToChat() {
    this.nav.push('/tabs/chat')
  }


  async presentAlert() {

    const flag = await this.utility.presentConfirm('OK', 'Cancel', 'Cancel Trial', 'Are you sure to cancel the Trial?' )
    if(flag){
      this.cancelTrail();
    }
  }


  async requestTrail() {

    let user = this.users.getUser()
    let v = await this.profiles.isProfileCompleted(user) as any;;
    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {
      }, "", 0.7);
      let send = data.data.send;

      if (send == true) {
        // this.trail = true;

        await this.globalCourses.requestTrial(this.data, user, data.data.message)
        this.callApi()

      }

    }
    else {
      this.nav.push('/student-profile/student-profile-edit', {
        backUrl: '/tabs/student-dashboard', showBack: true
      }
      )
    }

  }

  async cancelTrail() {

    let user = this.users.getUser();
    await this.globalCourses.cancelTrail(this.data, user)
    this.callApi()
  }

  // async isTrailReq() {

  //   this.loading = true;

  //   let user = this.users.getUser()

  //   let obj = {
  //     user_id: user.id,
  //     course_id: this.course_Id
  //   }
  //   let res = await this.network.getTrail(obj)
  //   if (res && !res.trial) {
  //     this.trail = false;
  //     this.loading = false;
  //   }
  //   if (res && res.trial) {
  //     this.trail = true;
  //     this.loading = false;
  //   }

  // }
}
