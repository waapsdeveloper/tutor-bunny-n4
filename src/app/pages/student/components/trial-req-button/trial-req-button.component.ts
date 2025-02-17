import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { NavService } from 'src/app/services/nav.service';
import { ProfileService } from 'src/app/services/profile.service';
import { GlobalTrialCoursesService } from 'src/app/services/student/global-trial-courses.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';
import { StudentWelcomeComponent } from '../../student-dashboard/student-welcome/student-welcome.component';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-trial-req-button',
  templateUrl: './trial-req-button.component.html',
  styleUrls: ['./trial-req-button.component.scss'],
})
export class TrialReqButtonComponent implements OnInit {

  status: string = '';
  trial: any;
  loading: boolean = false;
  course: any;
  teacher;

  @Input() buttonType: 'small' | 'large' = 'small';

  private _courseId;
  @Input()
  public get courseId() {
    return this._courseId;
  }
  public set courseId(value: any) {
    this._courseId = value;
    this.initiateTrialStatus(value);
  }

  hostScreensize = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
  }

  constructor(
    private utility: UtilityService,
    private users: UsersService,
    private profiles: ProfileService,
    private globalTrialCoursesService: GlobalTrialCoursesService,
    private modals: ModalService,
    private nav: NavService,
    private chats: ChatService
  ) {}

  ngOnInit(): void {
    this.updateColumnClass(window.innerWidth);
  }

  initiateTrialStatus(value: any) {
    console.log(value);

    this.globalTrialCoursesService.getItemByKey('course_id', value).subscribe( (data) => {
      console.log('rety', data)

      if(!data) {
        this.trial = null;
        this.status = '';
        return;
      }

      if(data){
        console.log("Hello",data);
        this.trial = data;
        this.status = data.status;
        console.log(this.status);
      }
    })






  }

  getButtonConfig() {
    let label = '';
    let icon = '';
    let action = '';

    // console.log(item.trial)

    // if (!trail && status === 'Pending') {
    //   return { label: 'Cancel trial', icon: 'assets/svg/trail.svg', action: 'presentAlert' };
    // }

    if (this.trial && this.status == 'Rejected') {
      // return { label: 'Free trial', icon: 'assets/svg/transfer.svg', action: 'requestTrail' };
      label = 'Free trial';
      icon = 'assets/svg/transfer.svg';
      action = 'requestTrail';
    }

    // if (!trail && status === 'Rejected') {
    //   return { label: 'Free trial', icon: 'assets/svg/transfer.svg', action: 'requestTrail' };
    // }

    if (this.trial && this.status == 'Pending') {
      label = 'Cancel Trial';
      icon = 'assets/svg/trail.svg';
      action = 'presentAlert';
    }

    if (this.trial && this.status == 'Accepted') {
      label = 'Message';
      icon = 'assets/icon/home/chat-icon.svg';
      action = 'chatMessage';
      // return { label: 'Trial Accepted', icon: '', action: '' };
    }

    // if (trail && status === 'Complete') {
    //   return { label: 'Trial Completed', icon: 'assets/svg/complete.svg', action: '' };
    // }

    if (!this.trial) {
      label = 'Free trial';
      icon = 'assets/svg/transfer.svg';
      action = 'requestTrail';
    }

    // return { label: 'Free trial', icon: 'assets/svg/transfer.svg', action: 'requestTrail' };

    if (this.hostScreensize <= 400 && this.buttonType !== 'large') {
      label = '';
    }

    return {
      label,
      icon,
      action,
    };
  }

  handleButtonClick(): void {

    if(!this.trial){
      this.requestTrail();
      return;
    }

    if(this.status == 'Accepted') {

      let data = {
        teacher_id: this.trial.teacher_id,
        course_id: this.trial.course_id
      }

      this.chatMessage(data);
      // this.globalTrialCoursesService.removeItem(this.trial.id);
    }

    if(this.status == 'Rejected') {
      this.globalTrialCoursesService.removeItem(this.trial.id);
    }

    if(this.status == 'Pending') {
      this.presentAlertForCancel();
    }






    // const buttonConfig = this.getButtonConfig();

    // if (buttonConfig) {
    //   if (buttonConfig.action === 'requestTrail') {
    //     this.requestTrail();
    //   } else if (buttonConfig.action === 'presentAlert') {
    //     this.presentAlert();
    //   }
    // }
  }

  async presentAlertForCancel() {
    const flag = await this.utility.presentConfirm(
      'OK',
      'Cancel',
      'Cancel Trial',
      'Are you sure to cancel the Trial?'
    );

    if (flag) {
      this.cancelTrail();
    }
  }

  async cancelTrail() {
    this.loading = true;
    let user = this.users.getUser();
    const res = await this.globalTrialCoursesService.cancelTrail(this.courseId, user.id);
    console.log(res)
    this.loading = false;

    // console.log(res);
    // this.item = res;
    // this.initialize(res)
  }

  async requestTrail() {
    const user = this.users.getUser();

    let v = (await this.profiles.isProfileCompleted(user)) as any;

    if (v || v == true) {
      const flag = await this.utility.presentConfirm(
        'OK',
        'Cancel',
        'Request Trial',
        'Are you sure to request the Trial?'
      );

      if (flag) {
        this.loading = true;
        const res = await this.globalTrialCoursesService.requestTrial(this.courseId, user.id, '');
        console.log(res);
        this.loading = false;
        // console.log(res)
        // this.initialize(res)
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

  async chatMessage(data) {
      let user = this.users.getUser();

      let v = (await this.profiles.isProfileCompleted(user)) as any;
      if (!v) {
        await this.openWelcomeComponent();
        return;
      }

      this.openChatWithData(data);
  }

  async openChatWithData(data) {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    let user = this.users.getUser();
    console.log(user);
    const chatRoomId = (await this.chats.getChadRoomId(
      user.id,
      data.teacher_id
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

}
