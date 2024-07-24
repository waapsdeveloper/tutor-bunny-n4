import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { TrailMessageComponent } from './trail-message/trail-message.component';
import { MyFavoritesService } from 'src/app/services/my-favorites.service';

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
    if (this.trial) {
      this.status = this.trial.status;
    }
  }
  courseId;
  status;
  blocked;
  loading = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('item')
  public get item() {
    return this._item;
  };
  public set item(value: any) {
    this._item = value;
    this.initialize(value);

    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.flag = this.getFlag();
    this.fav = value.is_liked_by_me;
  }
  fav = false;
  trail = false;
  languageName: any;
  constructor(injector: Injector, private alertController: AlertController, public favService: MyFavoritesService) {
    super(injector)
    this.user = this.users.getUser()

  }
  initialize(data) {
    if (data && data.trial) {
      this.blocked = data.trial.status

    }
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
    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {
      }, "", 0.7);;
      // return
      let send = data.data.send;
      if (send == true) {
        this.trail = true;
        let user = this.users.getUser()
        let obj = {
          user_id: user.id,
          course_id: id,
          message: data.data.message
        }
        let res = await this.network.requestTrail(obj)
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
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.cancelTrail(item);
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
    let user = this.users.getUser();

    this.item.is_liked_by_me = true;
    this.fav = true;
    this.favService.addFavorite(this.item, user);

  }

  async removeToFav() {
    let user = this.users.getUser()

    this.item.is_liked_by_me = false;
    this.fav = false;
    this.favService.removeFavorite(this.item, user);


  }



  setResult() {
    this.trail = true;
  }

  handleOkClick() {
    this.trail = false;
  }

}
