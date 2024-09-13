import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { TeacherQualificationComponent } from './teacher-qualification/teacher-qualification.component';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage extends BasePage implements OnInit, ViewWillEnter {
  user;
  displayName = 'LL'
  flag
  showGellary = false;
  item;
  data;
  shield;
  isExpanded = false;
  country;
  city;
  email;
  language;
  total_rating;
  state
  travel_policy;
  subject;
  images: any;
  params
  studentEmail
  roleId;
  rating;
  experince;

  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() {
    this.events.subscribe('get-user-after-submit-form', (data) => {
    })
  }

  ionViewWillEnter() {
    this.user = this.users.getUser();
    this.params = this.nav.getQueryParams();
    if (this.params.email) {
      this.studentEmail = this.params.email;
    }
    this.initialize()
  }

  async initialize() {
    this.roleId = localStorage.getItem('role');

    if (this.roleId == 3) {
      this.email = this.user.email;
    }
    else {
      this.email = this.studentEmail;
    }
    let obj = {
      email: this.email,
    };
    let res = await this.network.getUserByEmail(obj);
    console.log(res);

    if (res) {
      this.users.setUser(res.user);
      this.user = this.users.getUser();
      this.flag = this.getFlag()
      this.displayName = this.utility.getAmericanName(this.user.name);
      this.country = this.user.teacher.country.name;
      this.state = this.user.teacher.state.name;
      this.travel_policy = this.user.teacher.travel_policy.name;
      this.city = this.user.teacher.city;
      this.language = this.user.teacher.languages;
      this.total_rating = this.user.teacher.total_rating;
      this.rating = this.user.teacher.avg_rating
      this.subject = this.user.teacher.subjects;
      this.experince = this.user.teacher.started_teaching;
      const user = this.users.getUser();
      const data = await this.network.getImage(user.id) as any;
      this.images = data.result;
      if (this.images.length != 0) {
        this.showGellary = true;
      }
    }

    // if (this.data.status == 'approved') {
    //   this.shield = true;
    // }
  }


  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit', {
      backUrl: '/tabs/teacher-profile?user_id=' + this.user.id, showBack: true, title: 'Edit Profile'
    })
  }
  back(){
    this.nav.pop()
  }

  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
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

  openQulification() {
    let user = this.user

    this.modals.present(TeacherQualificationComponent, {user})
  }

}
