import { Component, Injector, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from '../base-page/base-page';
import { TrailMessageComponent } from '../student-dashboard/rec-courses/course-list/trail-message/trail-message.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.page.html',
  styleUrls: ['./student-course-detail.page.scss'],
})
export class StudentCourseDetailPage extends BasePage implements OnInit {
  data;
  params;
  trail = false;
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
  constructor(injector: Injector,  private alertController: AlertController) {
    super(injector)
  }

  ngOnInit() {



  }


  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.id) {
      this.course_Id = this.params.id;
      console.log('====================================');
      console.log(this.course_Id);
      console.log('====================================');
    }
    this.callApi();
    setTimeout(() => {
      this.isTrailReq()
    }, 200);
  }



  async callApi() {

    let res = await this.network.getcourseById(this.course_Id) as any;
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    this.data = res.course;
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
    this.techerImg = this.data.user.image
    this.country = this.data.user.teacher.country.name
    this.updated_at = this.data.updated_at;
    const startTime = this.acheduleTime.start_date;
    const endTime = this.acheduleTime.end_date;
    this.startTime = moment(startTime).format('hh:mm a');
    this.endTime = moment(endTime).format('hh:mm a');

    this.showFavValue = this.data.is_liked_by_me;
  }

  async addToFav() {
    console.log("dasdasaa");


    let user = this.users.getUser()
    let obj = {
      user_id: user.id,
      course_id: this.data.id
    }
    const res = await this.network.addCourseFav(obj)

    this.events.publish('update-fav-dot-d')
    this.callApi();
  }

  async removeFromFav() {
    let user = this.users.getUser()
    let obj = {
      user_id: user.id,
      course_id: this.data.id
    }
    const res = await this.network.removeCourseFav(obj)

   
    this.events.publish("show-list-of-fav-courses", {
     
    })
    this.callApi();

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

  async requestTrail() {


    // this.trail = true;
    let user = this.users.getUser()

    // let obj = {
    //   user_id: user.id,
    //   course_id: this.course_Id
    // }
    // let res = await this.network.requestTrail(obj)

    let v = await this.profiles.isProfileCompleted(user) as any;;
    console.log(v);

    if (v || v == true) {

      let data = await this.modals.present(TrailMessageComponent, {
      }, "", 0.7);;
      console.log(data.data);
      // return
      let send = data.data.send;
      console.log(send);



      if (send == true) {
        this.trail = true;
        let user = this.users.getUser()
        let obj = {
          user_id: user.id,
          course_id: this.course_Id,
          message: data.data.message
        }
        let res = await this.network.requestTrail(obj)
        console.log(res);
        this.trail = true;
      }
      else {
        return
      }
    }
    else {
      this.nav.push('/student-profile/student-profile-edit', {
        backUrl: '/tabs/student-dashboard', showBack: true
      }
      )
    }

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure to cancel the Trial?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.cancelTrail();
            console.log('Alert confirmed');
          },
        },
      ],
    });

    await alert.present();
  }

  async cancelTrail() {
    this.trail = false;
    let user = this.users.getUser()

    let obj = {
      user_id: user.id,
      course_id: this.course_Id
    }
    let res = await this.network.cancelTrail(obj)
  }

  async isTrailReq() {
    this.loading = true;

    let user = this.users.getUser()

    let obj = {
      user_id: user.id,
      course_id: this.course_Id
    }
    let res = await this.network.getTrail(obj)
    if (res && !res.trial) {
      this.trail = false;
      this.loading = false;
    }
    if (res && res.trial) {
      this.trail = true;
      this.loading = false;
    }

  }
}
