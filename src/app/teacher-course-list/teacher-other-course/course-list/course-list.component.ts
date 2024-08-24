import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { TrailMessageComponent } from 'src/app/student-dashboard/rec-courses/course-list/trail-message/trail-message.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage  implements OnInit {
  private _item: any;
  displayName;
  flag
  user;
  courseId;
  status;
  type;
  blocked;
  loading = false;
  trail = false;
  languageName: any;

  @Input('item')
  public get item() {
    return this._item;
  };

  public set item(value: any) {
    this._item = value;
    console.log(value);

    this.initialize(value);
    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.flag = this.getFlag();
    this.status = value.trial ? value.trial.status : null;
  }

  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
    this.user = this.users.getUser()
  }

  initialize(data) {
    if (data && data.trial) {
      this.blocked = data.trial.status
    }
    if(data && data.type == 3){
      this.type = data.type;
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
    this.nav.push('student-course-detail', params)

    // this.onChange.emit(res);
  }

  async requestTrail(id) {
    this.user = this.users.getUser()

    let v = await this.profiles.isProfileCompleted(this.user) as any;;
    console.log(v);

    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {
      }, "", 0.7);
      // return
      let send = data.data.send;
      if (send == true) {
        this.trail = true;
        this.globalCourses.requestTrial(this.item, this.user, data.data.message)
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

    const flag = await this.utility.presentConfirm('OK', 'Cancel', 'Cancel Trial', 'Are you sure to cancel the Trial?')

    if (flag) {
      this.cancelTrail(this.item);
    }

  }

  async cancelTrail(id) {
    this.trail = false;
    let user = this.users.getUser()
    this.globalCourses.cancelTrail(this.item, user)

  }

  async addToFav() {
    let user = this.users.getUser();

    this.item.is_liked_by_me = true;
    this.globalCourses.addFavorites(this.item, user);

  }

  async removeToFav() {
    let user = this.users.getUser()

    this.item.is_liked_by_me = false;
    this.globalCourses.removeFavorites(this.item, user);


  }



  setResult() {
    this.trail = true;
  }

  handleOkClick() {
    this.trail = false;
  }
  async goToChat(data) {
    console.log(data);
    let id = this.user.id;

    let obj= {
      user_id_1 : this.user.id,
      user_id_2 : data.user.id
    }


    let res = await this.network.getChadRoomId(obj)
    console.log(res);


    let params = {
      student_id : id,
      other_user_id: data.user.id,
      user :  JSON.stringify(data.user),
      chat_room_id: res.chat_room.id
    }

    this.nav.push('/tabs/chat', params)

  }

}
