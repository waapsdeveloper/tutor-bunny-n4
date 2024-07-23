import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { TrailMessageComponent } from './trail-message/trail-message.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  private _item: any;
  private _trial: any;
  displayName;
  flag
  user;
  @Input('trial')
  public get trial() {
    return this._trial;
  };
  public set trial(value: any) {
    this._trial = value;
    console.log(this._trial);
    console.log(this.trial);
    if(this.trial){
      this.status = this.trial.status;
    }
    
  }
  courseId;
  status;
  loading = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('item')
  public get item() {
    return this._item;
  };
  public set item(value: any) {
    this._item = value;
    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.flag = this.getFlag();
    this.fav = value.is_liked_by_me;
  }
  fav = false;
  trail = false;

  languageName: any;

  constructor(injector: Injector, private alertController: AlertController) {
    super(injector)
    this.initialize();
    this.user = this.users.getUser()

  }
  initialize() {
    
    
  }
  ngOnInit() {
    this.events.subscribe('update-fav-dot-d', (data) => {
      console.log(data);
    });
    setTimeout(() => {
      this.callApi()
    }, 200);

  }


  getFlag() {
    if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;

      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  async callApi() {
    this.loading = true;


    let obj = {
      user_id: this.user.id,
      course_id: this.item.id
    }
    // let res = await this.network.getTrail(obj)
    if (this.item && !this.item.trial) {
      this.trail = false;
      this.loading = false;
      
    }
    if (this.item && this.item.trial) {
      this.trail = true;
      this.loading = false;
    }

  }
  async goToDeatil(item) {


    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    let res = await this.nav.push('student-course-detail', params)
    this.events.publish('add-to-fav-from-detail', item);
    this.onChange.emit(res);

  }
  async requestTrail(id) {

    let v = await this.profiles.isProfileCompleted(this.user) as any;;
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
          course_id: id,
          message: data.data.message
        }
        let res = await this.network.requestTrail(obj)
        console.log(res);
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

  async presentAlert(item) {
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
            this.cancelTrail(item);
            console.log('Alert confirmed');
          },
        },
      ],
    });

    await alert.present();
  }
  async cancelTrail(id) {
    this.trail = false;
    let user = this.users.getUser()

    let obj = {
      user_id: user.id,
      course_id: id
    }
    let res = await this.network.cancelTrail(obj)
  }

  async addToFav() {

    let user = this.users.getUser()
    let obj = {
      user_id: user.id,
      course_id: this.item.id
    }
    const res = await this.network.addCourseFav(obj)
    this.fav = true;

    this.events.publish('update-fav-dot-d')

  }

  async removeToFav() {
    let user = this.users.getUser()
    let obj = {
      user_id: user.id,
      course_id: this.item.id
    }
    const res = await this.network.removeCourseFav(obj)
    this.fav = false;

    this.events.publish('update-fav-dot-d')
  }



  setResult() {
    this.trail = true;
  }

  handleOkClick() {
    this.trail = false;
  }

}
