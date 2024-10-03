import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { TeacherQualificationComponent } from './teacher-qualification/teacher-qualification.component';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import * as moment from 'moment';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage
  extends BasePage
  implements OnInit, ViewWillEnter
{
  user;
  displayName;
  flag;
  showGellary = false;
  item;
  data;
  shield;
  isExpanded = false;
  country;
  loading = false;
  city;
  email;
  language;
  verified_on;
  teacher;
  total_rating;
  rating;
  state;
  student;
  hourly_rate;
  travel_policy;
  subject;
  total_course;
  images: any;
  params;
  studentEmail;
  courses;
  roleId;
  experince;
  updateRating;
  updateTotalRating;

  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
  }

  async ngOnInit() {
    this.events.subscribe(
      'rating-rec-update-by-id',
      this.initialize.bind(this)
    );
    this.user = this.users.getUser();
    console.log(this.user);

    this.params = this.nav.getQueryParams();
    if (this.params.email) {
      this.studentEmail = this.params.email;
    }
    this.initialize();
  }

  getCourses(events) {
    console.log(events);
  }

  async ionViewWillEnter() {
    let obj = {
      search: 'search',
      page: 1,
    };

    const res = (await this.network.getMyCourseList(obj)) as any;
    console.log(res);
    this.total_course = res.result.total;
  }

  async initialize() {
    this.loading = true;
    this.roleId = localStorage.getItem('role');

    if (this.roleId == '3') {
      this.email = this.user.email;
    } else {
      this.email = this.studentEmail;
    }
    let obj = {
      email: this.email,
    };
    let res = await this.network.getUserByEmail(obj);
    console.log(res);

    if (this.roleId == '3') {
      console.log(this.roleId);

      if (res) {
        this.users.setUser(res.user);
        this.user = this.users.getUser();
        this.flag = this.getFlag();
        this.displayName = this.utility.getAmericanName(this.user.name);
        this.country = this.user.teacher.country.name;
        this.state = this.user.teacher.state.name;
        this.hourly_rate = this.user.teacher.hourly_rate;
        this.city = this.user.teacher.city;
        const verified_on = this.user.verified_on;
        this.verified_on = moment(verified_on).format('DD/MM/YY');
        this.language = this.user.teacher.languages;
        this.total_rating = this.user.teacher.total_rating;
        this.rating = this.user.teacher.avg_rating;
        this.travel_policy = this.user.teacher.travel_policy.name;
        this.subject = this.user.teacher.subjects;
        this.experince = this.user.teacher.started_teaching;
        const user = this.users.getUser();
        const data = (await this.network.getImage(user.id)) as any;
        this.images = data.result;
        if (this.images.length != 0) {
          this.showGellary = true;
        }
      }
    } else {
      console.log(this.roleId, 'dsffs');
      this.user = res.user;
      localStorage.setItem('teacher', JSON.stringify(this.user));
      this.flag = this.getFlag();
      const verified_on = this.user.verified_on;
      this.verified_on = moment(verified_on).format('DD/MM/YY');
      this.displayName = this.utility.getAmericanName(this.user.name);
      this.country = this.user.teacher.country.name;
      this.state = this.user.teacher.state.name;
      this.city = this.user.teacher.city;
      this.travel_policy = this.user.teacher.travel_policy.name;
      this.verified_on = this.user.verified_on;
      this.language = this.user.teacher.languages;
      this.total_rating = this.user.teacher.total_rating;
      this.rating = this.user.teacher.avg_rating;
      this.subject = this.user.teacher.subjects;
      this.experince = this.user.teacher.started_teaching;
      const user = this.users.getUser();
      const data = (await this.network.getImage(user.id)) as any;
      this.images = data.result;
      if (this.images.length != 0) {
        this.showGellary = true;
      }
    }
    this.loading = false;
  }

  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit', {
      backUrl: '/tabs/teacher-profile?user_id=' + this.user.id,
      showBack: true,
      title: 'Edit Profile',
    });
  }

  back() {
    this.nav.pop();
  }

  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
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

  openQulification() {
    let user = this.user;

    this.modals.present(TeacherQualificationComponent, { user });
  }

  async goToChat() {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    console.log(this.teacher);

    this.student = this.users.getUser();
    let id = this.user.id;
    let obj = {
      user_id_1: this.student.id,
      user_id_2: this.teacher.id,
    };
    console.log(obj);
    // return
    let res = await this.network.getChadRoomId(obj);
    let params = {
      student_id: id,
      other_user_id: this.teacher.id,
      user: JSON.stringify(this.teacher),
      chat_room_id: res.chat_room.id,
    };
    this.nav.push('/tabs/chat', params);
  }
}
