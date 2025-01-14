import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { StudentWelcomeComponent } from 'src/app/pages/student/student-dashboard/student-welcome/student-welcome.component';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-generic-teacher-card',
  templateUrl: './generic-teacher-card.component.html',
  styleUrls: ['./generic-teacher-card.component.scss'],
})
export class GenericTeacherCardComponent extends BasePage {

  flag;
  rating;
  total_rating;
  private _item: any;

  @Output() openDetails = new EventEmitter<any>();

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
  constructor(injector: Injector,
    private chats : ChatService
  ) {
    super(injector);
    this.user = this.users.getUser();
  }

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
  // async goToChat(data) {
  //

  //   this.user = this.users.getUser();
  //   let v = (await this.profiles.isProfileCompleted(this.user)) as any;
  //   if (v || v == true) {
  //     let id = this.user.id;
  //     let obj = {
  //       user_id_1: this.user.id,
  //       user_id_2: data.id,
  //     };
  //     let res = await this.network.getChadRoomId(obj);
  //     let params = {
  //       student_id: id,
  //       other_user_id: data.id,
  //       user: JSON.stringify(data),
  //       chat_room_id: res.chat_room.id,
  //       goToMessage: true
  //     };
  //     this.nav.push('/tabs/chat', params);
  //   }
  //   else {
  //     let res = await this.modals.present(
  //       StudentWelcomeComponent,
  //       {},
  //       'auto-height-modal',
  //       1,
  //       [0, 1],
  //       false
  //     );
  //     let key = res.data.key;
  //     if (key == 1) {
  //       this.nav.push('/student-profile/student-profile-edit', {
  //         showBack: true,
  //       });
  //     }
  //   }
  // }
  async goToChat(data) {
    let user = this.users.getUser();

    let v = (await this.profiles.isProfileCompleted(user)) as any;
    if (!v) {
      await this.openWelcomeComponent();
      return;
    }
    this.openChatWithData(data);
  }

  async openChatWithData(data) {
    this.user = this.users.getUser();
    const chatRoomId = await this.chats.getChadRoomId(data.id, this.user.id) as number;

    if(chatRoomId != -1){
      this.nav.push('messages', {
        chat_room_id: chatRoomId
      })
    }
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
  seeAll(user) {
    let params = {
      user_name: user.name,
      user_id : user.id
    };

    // return

    this.nav.push('teacher-course-list', params);
  }
}
