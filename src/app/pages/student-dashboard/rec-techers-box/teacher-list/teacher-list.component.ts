import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent extends BasePage implements OnInit {
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  }
  public set item(value: any) {
    this._item = value;
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

  gototecher(email) {
    const params = {
      email: email,
    };
    this.nav.push('/teacher-profile', params);
  }
  async goToChat(data) {
    console.log(data);
    let id = this.user.id;
    let obj = {
      user_id_1: this.user.id,
      user_id_2: data.id,
    };
    let res = await this.network.getChadRoomId(obj);
    let params = {
      student_id: id,
      other_user_id: data.id,
      user: JSON.stringify(data),
      chat_room_id: res.chat_room.id,
    };
    console.log(params);
    this.nav.push('/tabs/chat', params);
  }
  seeAll(user) {
    console.log(user);
    let params ={
      user : JSON.stringify(user)
    }

    this.nav.push('teacher-course-list', params)
  }
}
