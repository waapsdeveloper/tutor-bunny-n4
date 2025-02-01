import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';
import { StudentWelcomeComponent } from 'src/app/pages/student/student-dashboard/student-welcome/student-welcome.component';
import { GlobalFavCoursesService } from 'src/app/services/student/global-fav-courses.service';

@Component({
  selector: 'app-generic-course-card',
  templateUrl: './generic-course-card.component.html',
  styleUrls: ['./generic-course-card.component.scss'],
})
export class GenericCourseCardComponent extends BasePage {

  private _item: any;
  displayName;
  flag;
  user;
  courseId;
  status;
  rating;
  type;
  total_rating;
  loading = false;
  trail = false;
  languageName: any;
  teacherImage;
  itemExistInFav$ = false;

  @Output() openDetails = new EventEmitter<any>();


  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.initialize(value);

  }

  constructor(
    injector: Injector,
    private courseFavoriteService: GlobalFavCoursesService,
    public globalCourses: GlobalCoursesService,
    private chats : ChatService
  ) {
    super(injector);
    this.user = this.users.getUser();
  }

  initialize(data) {

    
    this.courseFavoriteService.isItemExist('course_id', data.id).subscribe( count => {
      this.itemExistInFav$ = count > 0;
    })

    this.rating = data.user.teacher.avg_rating;
    this.total_rating = data.user.teacher.total_rating;
    this.displayName = this.utility.getAmericanName(data.user.name);
    this.flag = this.utility.getFlag(data.user);
    this.status = data.trial ? data.trial.status : null;
    this.teacherImage = data.user.image
    if (data && data.type == 3) {
      this.type = data.type;
    }
  }


  async goToDetail(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('student-course-detail', params);
  }

  async requestTrail(id) {
    this.user = this.users.getUser();

    let v = (await this.profiles.isProfileCompleted(this.user)) as any;

    if (v || v == true) {

      const flag = await this.utility.presentConfirm(
        'OK',
        'Cancel',
        'Request Trial',
        'Are you sure to request the Trial?'
      );

      if (flag) {
        this.trail = true;
        this.globalCourses.requestTrial(this.item, this.user, '');
      }

      // let data = await this.modals.present(TrailMessageComponent, {}, '', 0.7);
      // // return
      // let send = data.data.send;
      // if (send == true) {
      //   this.trail = true;
      //   this.globalCourses.requestTrial(this.item,this.user, data.data.message );
      // } else {
      //   return;
      // }




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

  async presentAlert() {
    const flag = await this.utility.presentConfirm(
      'OK',
      'Cancel',
      'Cancel Trial',
      'Are you sure to cancel the Trial?'
    );

    if (flag) {
      this.cancelTrail(this.item);
    }
  }

  async cancelTrail(id) {
    this.trail = false;
    let user = this.users.getUser();
    this.globalCourses.cancelTrail(this.item, user);
  }

  async addToFav() {
    // let showFav = true;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.item.is_liked_by_me = true;
    this.courseFavoriteService.addFavorites(this.item, user);
  }

  async removeToFav() {
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.item.is_liked_by_me = false;
    this.courseFavoriteService.removeFavorites(this.item, user);
  }

  setResult() {
    this.trail = true;
  }

  handleOkClick() {
    this.trail = false;
  }

  // async goToChat(data) {
  //   let v = (await this.profiles.isProfileCompleted(this.user)) as any;
  //   if (v || v == true) {
  //     let id = this.user.id;
  //     let obj = {
  //       user_id_1: this.user.id,
  //       user_id_2: data.user.id,
  //     };
  //     let res = await this.network.getChadRoomId(obj);
  //     let params = {
  //       student_id: id,
  //       other_user_id: data.user.id,
  //       user: JSON.stringify(data.user),
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
    const chatRoomId = await this.chats.getChadRoomId(data.user.id, this.user.id) as number;

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

  handleButtonClick(item: any): void {
    const buttonConfig = this.getButtonConfig(item);

    if (buttonConfig) {
      if (buttonConfig.action === 'requestTrail') {
        this.requestTrail(item.id);
      } else if (buttonConfig.action === 'presentAlert') {
        this.presentAlert();
      }
    }
  }

  getButtonConfig(item: any) {

    const trail = item?.trial ?? null;
    const status = item?.trail?.status ?? null;

    // if (!trail && status === 'Pending') {
    //   return { label: 'Cancel trial', icon: 'assets/svg/trail.svg', action: 'presentAlert' };
    // }

    if (!trail && status !== 'Rejected') {
      return { label: 'Free trial', icon: 'assets/svg/transfer.svg', action: 'requestTrail' };
    }

    if (!trail && status === 'Rejected') {
      return { label: 'Free trial', icon: 'assets/svg/transfer.svg', action: 'requestTrail' };
    }

    if (trail && status !== 'Accepted' && status !== 'Rejected' && status !== 'Complete') {
      return { label: 'Cancel trial', icon: 'assets/svg/trail.svg', action: 'presentAlert' };
    }

    if (trail && status === 'Accepted') {
      return { label: 'Trial Accepted', icon: '', action: '' };
    }

    if (trail && status === 'Complete') {
      return { label: 'Trial Completed', icon: 'assets/svg/complete.svg', action: '' };
    }

    return null;
  }


}
