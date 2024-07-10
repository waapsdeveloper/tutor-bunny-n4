import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { TrailMessageComponent } from 'src/app/student-dashboard/rec-courses/course-list/trail-message/trail-message.component';

@Component({
  selector: 'app-fav-rec-list',
  templateUrl: './fav-rec-list.component.html',
  styleUrls: ['./fav-rec-list.component.scss'],
})
export class FavRecListComponent extends BasePage implements OnInit {
  private _item: any;
  displayName;
  flag
  user;
  loading = false;
  @Output() unFav = new EventEmitter<number>();

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
  }
  initialize() {




  }
  ngOnInit() {

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

    this.user = this.users.getUser()

    let obj = {
      user_id: this.user.id,
      course_id: this.item.id
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
  goToDeatil(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    this.nav.push('student-course-detail', params)
  }
  async requestTrail(id) {

    let v = await this.profiles.isProfileCompleted(this.user) as any;;
    console.log(v);

    if (v || v == true) {

      let data = await this.modals.present(TrailMessageComponent, {
      }, "", 0.7);;
      console.log(data);
      // return

      this.trail = true;
      let user = this.users.getUser()

      let obj = {
        user_id: user.id,
        course_id: id,
        message: data.result
      }
      let res = await this.network.requestTrail(obj)
    }
    else {
      this.nav.push('/student-profile/student-profile-edit', {
        backUrl: '/tabs/student-dashboard', showBack: true
      }
      )
    }


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

  }

  async removeToFav() {
    let user = this.users.getUser()
    let obj = {
      user_id: user.id,
      course_id: this.item.id
    }
    const res = await this.network.removeCourseFav(obj)
    this.fav = false;
    if (res.status === 200) {
      this.unFav.emit(this.item.id);
    }
  }



  setResult() {
    this.trail = true;
  }

  handleOkClick() {
    this.trail = false;
  }

}
