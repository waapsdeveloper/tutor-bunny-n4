import { Component, OnInit, Input, Injector, Output, EventEmitter, ChangeDetectorRef, HostListener} from '@angular/core';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';
import { StudentWelcomeComponent } from 'src/app/pages/student/student-dashboard/student-welcome/student-welcome.component';
import { GlobalFavCoursesService } from 'src/app/services/student/global-fav-courses.service';
import { GlobalTrialCoursesService } from 'src/app/services/student/global-trial-courses.service';

@Component({
  selector: 'app-generic-course-card',
  templateUrl: './generic-course-card.component.html',
  styleUrls: ['./generic-course-card.component.scss'],
})
export class GenericCourseCardComponent extends BasePage implements OnInit {

  private _item: any;
  itemExistInFav$ = false;
  itemExistInTrial$ = false;
  
  displayName;
  flag;
  user;
  courseId;
  status = null;
  rating;
  type;
  total_rating;
  loading = false;
  trail = null;
  languageName: any;
  teacherImage;

  favLoading = false;


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
    private trialCoursesService: GlobalTrialCoursesService,
    public globalCourses: GlobalCoursesService,
    private chats : ChatService,
  ) {
    super(injector);
    this.user = this.users.getUser();
  }
  
  hostScreensize = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
  }

  ngOnInit(): void {
    this.updateColumnClass(window.innerWidth);   
  }

  initialize(data) {
    
    this.courseFavoriteService.isItemExist('course_id', data.id).subscribe( count => {
      this.itemExistInFav$ = count > 0;
    })

    this.rating = data.avg_rating || 0;
    this.total_rating = data.total_rating || 0;
    this.displayName = this.utility.getAmericanName(data.user.name);
    this.flag = this.utility.getFlag(data.user);
    this.status = data.trial ? data.trial.status : null;
    this.teacherImage = data.user.image
    if (data && data.type == 3) {
      this.type = data.type;
    }
    this.trail = data.trial;
  }


  async goToDetail(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('student-course-detail', params);
  }


  

 

  async addToFav() {
    // let showFav = true;
    // this.events.publish('show-fav-dot', showFav);

    if(this.favLoading == true){
      return
    }
    this.favLoading = true;
    this.itemExistInFav$ = true;
    let user = this.users.getUser();
    await this.courseFavoriteService.addFavorites(this.item, user);
    this.favLoading = false;
  }

  async removeToFav() {
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
    if(this.favLoading == true){
      return
    }
    
    this.favLoading = true;
    this.itemExistInFav$ = false;
    let user = this.users.getUser();
    await this.courseFavoriteService.removeFavorites(this.item, user);
    this.favLoading = false;
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

  



}
