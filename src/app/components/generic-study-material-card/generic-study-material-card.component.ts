import { Component, OnInit, Input, Injector, EventEmitter, Output } from '@angular/core';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { CourseFavoriteService } from 'src/app/services/course-favorite.service';
import { BasePage } from 'src/app/base-page/base-page';
import { StudentWelcomeComponent } from 'src/app/pages/student-dashboard/student-welcome/student-welcome.component';
import { TrailMessageComponent } from '../trail-message/trail-message.component';
import { ChatService } from 'src/app/services/chat.service';
import { log } from 'console';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { StripePayComponent } from 'src/app/stripe-pay/stripe-pay.component';

@Component({
  selector: 'app-generic-study-material-card',
  templateUrl: './generic-study-material-card.component.html',
  styleUrls: ['./generic-study-material-card.component.scss'],
})
export class GenericStudyMaterialCardComponent
  extends BasePage
  implements OnInit
{
  list: any[] = [];
  private _item: any;
  displayName;
  flag;
  user;
  courseId;
  status;
  rating;
  type;
  blocked;
  total_rating;
  loading = false;
  trail = false;
  languageName: any;

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
    private courseFavoriteService: CourseFavoriteService,
    public globalCourses: GlobalCoursesService,
    private chats: ChatService
  ) {
    super(injector);

    this.user = this.users.getUser();

    this.events.subscribe(
      'update-course-item-like',
      (data) => {
        // user_id: user.id,
        // course_id: obj.id,
        // liked: true



        if (this.item.id == data.course_id) {
          this.item.is_liked_by_me = data.liked;
        }
      },
      false
    );
  }

  async initialize(data) {

    this.rating = data.user.teacher.avg_rating;
    this.total_rating = data.user.teacher.total_rating;
    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.flag = this.getFlag(data);
    this.status = data.trial ? data.trial.status : null;

    if (data && data.trial) {
      this.blocked = data.trial.status;
    }
    if (data && data.type == 3) {
      this.type = data.type;
    }

  }

  ngOnInit() {
    setTimeout(() => {
      this.callApi();
    }, 200);
  }

  getFlag(data) {
    if (data && data.user.teacher && data.user.teacher.country) {
      const flag = data.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
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

  async goToDetail(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('student-study-material-detail', params);
  }

  async requestTrail(id) {
    this.user = this.users.getUser();

    let v = (await this.profiles.isProfileCompleted(this.user)) as any;

    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {}, '', 0.7);
      // return
      let send = data.data.send;
      if (send == true) {
        this.trail = true;
        this.globalCourses.requestTrial(
          this.item,
          this.user,
          data.data.message
        );
      } else {
        return;
      }
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
    const chatRoomId = (await this.chats.getChadRoomId(
      data.user.id,
      this.user.id
    )) as number;

    if (chatRoomId != -1) {
      this.nav.push('messages', {
        chat_room_id: chatRoomId,
      });
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

  async openStripe() {

    const res = await this.modals.present(StripePayComponent);

    // let obj = {
    //   study_material_id: this.item.id,
    // };
    // const res = await this.network.purchaseMaterial(obj);
    // console.log(res);

    // if (res.bool == true) {
    //   try {
    //     const paymentIntent = res.result.client_secret;
    //     const customer = res.result.customer_id;
    //     const ephemeralKey = res.result.ephemeral_key;

    //     // prepare PaymentSheet with CreatePaymentSheetOption.
    //     await Stripe.createPaymentSheet({
    //       paymentIntentClientSecret: paymentIntent,
    //       customerId: customer,
    //       customerEphemeralKeySecret: ephemeralKey,
    //       merchantDisplayName: 'TutorBunny',
    //     });

    //     // present PaymentSheet and get result.
    //     const result = await Stripe.presentPaymentSheet();
    //     console.log(result);
    //     if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
    //       // Happy path
    //     }
    //   } catch (error) {}
    // }
  }
}
