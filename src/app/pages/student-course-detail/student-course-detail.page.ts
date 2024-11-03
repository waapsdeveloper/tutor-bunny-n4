import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from '../../base-page/base-page';
import { GlobalCoursesService } from '../../services/global-courses.service';
import { IonContent } from '@ionic/angular';
import { StudentWelcomeComponent } from '../student-dashboard/student-welcome/student-welcome.component';
import { CourseFavoriteService } from 'src/app/services/course-favorite.service';
import { TrailMessageComponent } from 'src/app/components/trail-message/trail-message.component';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.page.html',
  styleUrls: ['./student-course-detail.page.scss'],
})
export class StudentCourseDetailPage extends BasePage {
  // implements OnInit

  @ViewChild(IonContent, { static: false }) content: IonContent;

  data;
  params;
  backUrl;
  displayName;
  course_Id;
  lessons;
  btn_loading = false;
  teacher;
  user
  currencySymbol;
  techerTitle;
  language;
  spinner = false;
  capacity;
  rating;
  techerImg;
  loading = false;
  description;
  duration;
  mode_type;
  isExpanded = false;
  title;
  serial_number;
  created_at;
  state;
  image;
  price;
  from_age;
  to_age;
  endDate;
  country;
  startTime;
  flag;
  type;
  endTime;
  updated_at;
  schedules: any[] = [];
  total_rating;
  course_user;
  acheduleTime;
  startDate;
  showFavValue = false;

  constructor(injector: Injector,
    private courseFavoriteService: CourseFavoriteService,

    public globalCourses: GlobalCoursesService) {
    super(injector);
  }

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.id) {
      this.course_Id = this.params.id;
    }
    this.spinner = true;

    this.callApi();

    setTimeout(() => {
      this.isTrailReq();
    }, 200);
  }

  async callApi() {

    let res = (await this.globalCourses.getcourseById(this.course_Id)) as any;

    this.data = res;
    this.teacher = res.user;
    localStorage.setItem('teacher', JSON.stringify(this.teacher));

    this.events.publish('data-for-other-corses', this.data);
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
    this.price = this.data.updated_price;
    this.schedules = this.data.schedules;
    this.acheduleTime = this.schedules;
    this.lessons = this.data.lesson;
    this.created_at = this.data.created_at;
    this.techerTitle = this.data.user.teacher.title;
    this.course_user = this.data.user;
    this.image = this.data.image;
    this.rating = this.data.user.teacher.avg_rating;
    this.total_rating = this.data.user.teacher.total_rating;
    this.techerImg = this.data.user.image;
    this.country = this.data.user.teacher.country.name;
    this.state = this.data.user.teacher.state.name;
    this.updated_at = this.data.updated_at;
    this.type = this.data.type;
    this.currencySymbol = this.data.auth_user_currency_symbol;
    const startTime = this.acheduleTime.start_date;
    const endTime = this.acheduleTime.end_date;
    this.startTime = moment(startTime).format('hh:mm a');
    this.endTime = moment(endTime).format('hh:mm a');
    this.showFavValue = this.data.is_liked_by_me;
    if (this.data.start_date) {
      const startDate = this.data.start_date;
      this.startDate = moment(startDate).format('DD-MMM-YYYY');
    }

    if (this.data.end_date) {
      const endDate = this.data.end_date;
      this.endDate = moment(endDate).format('DD-MMM-YYYY');
    }
    this.spinner = false;
  }

  async addToFav() {
    let user = this.users.getUser();

    this.data.is_liked_by_me = true;
    this.showFavValue = true;
    this.courseFavoriteService.addFavorites(this.data, user);
  }

  async removeToFav() {
    let user = this.users.getUser();

    this.data.is_liked_by_me = false;
    this.showFavValue = false;
    this.courseFavoriteService.removeFavorites(this.data, user);
  }

  getFlag() {
    if (this.data && this.data.user.teacher && this.data.user.teacher.country) {
      const flag = this.data.user.teacher.country.iso2;

      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  async goToChat() {
    this.user = this.users.getUser();
    let v = (await this.profiles.isProfileCompleted(this.user)) as any;
    if (v || v == true) {


      let id = this.user.id;
      let obj = {
        user_id_1: this.user.id,
        user_id_2: this.course_user.id,
      };
      let res = await this.network.getChadRoomId(obj);
      let params = {
        student_id: id,
        other_user_id: this.course_user.id,
        user: JSON.stringify(this.course_user),
        chat_room_id: res.chat_room.id,
      };
      this.nav.push('/tabs/chat', params);
    } else {
      let res = await this.modals.present(
        StudentWelcomeComponent,
        {},
        'auto-height-modal',
        1,
        [0, 1],
        false
      );
      let key = res.data.key;
      if (key == 1) {
        this.nav.push('/student-profile/student-profile-edit', {
          showBack: true,
        });
      }
    }
  }

  async presentAlert() {
    const flag = await this.utility.presentConfirm(
      'OK',
      'Cancel',
      'Cancel Trial',
      'Are you sure to cancel the Trial?'
    );
    if (flag) {
      this.cancelTrail();
    }
  }

  async requestTrail() {
    this.btn_loading = true;

    let user = this.users.getUser();
    let v = (await this.profiles.isProfileCompleted(user)) as any;
    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {}, '', 0.7);
      let send = data.data.send;
      if (send == true) {
        await this.globalCourses.requestTrial(
          this.data,
          user,
          data.data.message
        );
        this.callApi();
        this.events.publish('update-course-list');
      }
    } else {
      let res = await this.modals.present(
        StudentWelcomeComponent,
        {},
        'auto-height-modal',
        1,
        [0, 1],
        false
      );
      let key = res.data.key;
      if (key == 1) {
        this.nav.push('/student-profile/student-profile-edit', {
          showBack: true,
        });
      }
    }
    this.btn_loading = false

  }

  async cancelTrail() {
    this.btn_loading = true;
    let user = this.users.getUser();
    await this.globalCourses.cancelTrail(this.data, user);
    this.callApi();
    this.btn_loading = false;
  }

  async isTrailReq() {
    this.loading = true;

    let user = this.users.getUser();

    let obj = {
      user_id: user.id,
      course_id: this.course_Id,
    };
    let res = await this.network.getTrail(obj);
    if (res && !res.trial) {
      this.loading = false;
    }
    if (res && res.trial) {
      this.loading = false;
    }
  }
  goToTeacher() {
    const params = {
      email: this.data.user.email,
    };
    this.nav.push('/teacher-profile', params);
  }

  getOtherCourse(event) {
    this.course_Id = event.id;
    this.callApi();

    this.content.scrollToTop(500); // 500ms animation duration
  }
}
