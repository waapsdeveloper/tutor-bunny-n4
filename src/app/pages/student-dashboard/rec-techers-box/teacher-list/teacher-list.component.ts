import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { StudentWelcomeComponent } from '../../student-welcome/student-welcome.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent extends BasePage implements OnInit {
  rating;
  total_rating;
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  }
  public set item(value: any) {
    this._item = value;
    this.total_rating = value.teacher.total_rating;
    this.rating = value.teacher.avg_rating;
    this.displayName = this.utility.getAmericanName(this.item.name);
  }
  subjects;
  user;
  displayName;
  constructor(injector: Injector) {
    super(injector);
    this.user = this.users.getUser();
  }

  ngOnInit() {}

  getFlag() {
    if (this.item && this.item.teacher && this.item.teacher.country) {
      const flag = this.item.teacher.country.iso2;
      return flag.toLowerCase();
    } else {
      return '';
    }
  }

  gototecher(item) {
    localStorage.setItem('teacher', JSON.stringify(item));
    const params = {
      email: item.email,
    };
    this.nav.push('/teacher-profile', params);
  }
  async goToChat(data) {
    this.user = this.users.getUser();
    let v = (await this.profiles.isProfileCompleted(this.user)) as any;
    if (v || v == true) {
      let id = this.user.id;
      let obj = {
        user_id_1: this.user.id,
        user_id_2: data.user.id,
      };
      let res = await this.network.getChadRoomId(obj);
      let params = {
        student_id: id,
        other_user_id: data.user.id,
        user: JSON.stringify(data.user),
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
  seeAll(user) {
    let params = {
      user: JSON.stringify(this.user),
    };

    this.nav.push('teacher-course-list', params);
  }
}
