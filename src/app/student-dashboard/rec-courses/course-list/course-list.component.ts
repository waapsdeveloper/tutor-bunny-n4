import { Component, Injector, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  private _item: any;
  displayName;
  flag
  loading = false;
  @Input('item')
  public get item() {
    return this._item;
  };
  public set item(value: any) {
    this._item = value;
    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.flag = this.getFlag();
    this.callApi()
  }
  fav = false;
  trail = false;
  // alertButtons = [
  //   {
  //     text: 'No',
  //     role: 'cancel',
  //     handler: () => {
  //       console.log('Cancel clicked');
  //       this.setResult()
  //     }
  //   },
  //   {
  //     text: 'Yes',
  //     handler: () => {
  //       console.log('OK clicked');
  //       this.handleOkClick();
  //     }
  //   }
  // ];
  languageName: any;

  constructor(injector: Injector, private alertController: AlertController) {
    super(injector)
    this.initialize();
  }
  initialize() { 

   
    
    
  }
  ngOnInit() { }
  getFlag() {
    console.log(this.item.user.teacher);
    if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;
      console.log(flag);
      
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

    let user = this.users.getUser()
    console.log(user);

    let obj = {
      user_id: user.id,
      course_id: this.item.id
    }
    let res = await this.network.getTrail(obj)
    console.log(res)
    if (res && !res.trial) {
      this.trail = false;
      this.loading = false;
    }
    if(res && res.trial){
      this.trail = true;
      this.loading = false;

    }
  }
  goToDeatil(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    console.log(params);
    this.nav.push('student-course-detail', params)
  }
  async requestTrail(id) {
    // this.presentAlert();
    this.trail = true;
    let user = this.users.getUser()
    console.log(user);

    let obj = {
      user_id: user.id,
      course_id: id
    }
    let res = await this.network.requestTrail(obj)
    console.log(res);

  }
  addToFav() {
    this.fav = true;
  }
  RemoveToFav() {
    this.fav = false;
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Cancel Trial Request',
  //     message: 'Are you sure to cancel trail Request',
  //     buttons: this.alertButtons
  //   });

  //   await alert.present();
  // }

  setResult() {
    console.log('Alert dismissed with role:');
    this.trail = true;
  }

  handleOkClick() {
    // Handle the OK click here
    console.log('Handling OK click');
    this.trail = false;
  }

}
