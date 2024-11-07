import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { TeacherQualificationComponent } from './teacher-qualification/teacher-qualification.component';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import * as moment from 'moment';
import { StudentWelcomeComponent } from '../student-dashboard/student-welcome/student-welcome.component';
import { ChatService } from 'src/app/services/chat.service';

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
  course;
  courses;
  roleId;
  experince;
  updateRating;
  updateTotalRating;

  constructor(injector: Injector, public globalCourses: GlobalCoursesService, private chats: ChatService) {
    super(injector);
  }

  async ngOnInit() {
    this.events.subscribe(
      'rating-rec-update-by-id',
      this.initialize.bind(this)
    );
    this.user = this.users.getUser();

    this.params = this.nav.getQueryParams();
    if (this.params.email) {
      this.studentEmail = this.params.email;
    }
    this.initialize();
  }

  getCourses(events) {
    this.course = events.total;
  }

  async ionViewWillEnter() {
    let obj = {
      search: 'search',
      page: 1,
    };
    this.roleId = localStorage.getItem('role');
    if (this.teacher) {
      if (this.roleId == '3') {
        let id = this.user.id;
        const res = (await this.network.getMyCourseList(obj, id)) as any;
      } else {
        let id = this.teacher.id;
        const res = (await this.network.getMyCourseList(obj, id)) as any;
      }
    }
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

    if (this.roleId == '3') {
      if (res) {
        this.users.setUser(res.user);
        this.user = this.users.getUser();
        console.log('====================================');
        console.log(this.user);
        console.log('====================================');
        this.flag = this.getFlag();
        this.displayName = this.utility.getAmericanName(this.user.name);
        this.country = this.user.teacher.country.name;
        this.state = this.user.teacher.state.name;
        this.hourly_rate = this.user.teacher.hourly_rate;
        this.city = this.user.teacher.city;
        const verified_on = this.user.verified_on;
        this.verified_on = moment(verified_on).format('DD-MMM-YYYY');
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
      this.user = res.user;

      this.flag = this.getFlag();
      const verified_on = this.user.verified_on;
      this.verified_on = moment(verified_on).format('DD-MMM-YYYY');
      this.displayName = this.utility.getAmericanName(this.user.name);
      this.country = this.user.teacher.country.name;
      this.state = this.user.teacher.state.name;
      this.city = this.user.teacher.city;
      this.hourly_rate = this.user.teacher.converted_hourly_rate;
      this.travel_policy = this.user.teacher.travel_policy.name;
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
    localStorage.removeItem('teacher');
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
    let user = this.users.getUser();
    console.log(user);
    let v = (await this.profiles.isProfileCompleted(user)) as any;
    if (!v) {
      await this.openWelcomeComponent();
      return;
    }

    this.openChatWithData();
  }

  async openChatWithData() {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.student = this.users.getUser();
    let obj = {
      user_id_1: this.student.id,
      user_id_2: this.teacher.id,
    };
    let res = await this.network.getChadRoomId(obj);

    console.log(res)
    if(res && res.chat_room){
      this.nav.push('messages',{
        chat_room_id: res.chat_room.id
      })
      // const prm = await this.chats.openChat(res.chat_room);
    }



    // let params = {
    //   student_id: this.student.id,
    //   other_user_id: this.teacher.id,
    //   user: JSON.stringify(this.teacher),
    //   chat_room_id: res.chat_room.id,
    // };
    // this.nav.push('/chat', params);
  }

  async openWelcomeComponent() {
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
