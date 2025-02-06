import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { TrailMessageComponent } from 'src/app/components/trail-message/trail-message.component';
import { ChatService } from 'src/app/services/chat.service';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { StudentWelcomeComponent } from '../student-dashboard/student-welcome/student-welcome.component';
import {
  bannerData,
  infoColumnSingleItem,
  infoData,
  teacherCardInfo,
} from 'src/app/interfaces/detail-data';
import { GlobalFavCoursesService } from 'src/app/services/student/global-fav-courses.service';
import { log } from 'node:console';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.page.html',
  styleUrls: ['./student-course-detail.page.scss'],
})
export class StudentCourseDetailPage extends BasePage {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  course$;
  courseId;
  trail = false;
  sliderImages: any[] = [];

  bannerData: bannerData = {
    liked_by_me: false,
    sliderImages: [],
    actions: [],
  };

  infoData: infoData = {
    title: '',
    currency_symbol: '',
    price: '',
    rating: 0.0,
    total_rating: 0,
    per_unit: '/lesson',
  };

  columnData = {
    colA: [],
    colB: [],
  };

  aboutData = {
    heading: 'Details',
    text: '',
  };

  teacherData: teacherCardInfo = {
    email: '',
    teacher_id: -1,
    image: '',
    name: '',
    flag: '',
    country: '',
    icon: '',
    text: '',
  };

  scheduleData = {
    schedules: [],
  };

  coursesData = {
    heading: 'Similar Courses',
    list: [],
  };

  ratingData = {
    heading: 'Reviews',
    list: [],
  };
  
  itemExistInFav$ = false;

  params;

  backUrl;
  displayName;
  course_Id;
  // lessons;
  btn_loading = false;
  teacher;
  user;
  // currencySymbol;
  techerTitle;
  // language;
  spinner = false;
  // capacity;
  // rating;
  techerImg;
  loading = false;
  //description;
  // duration;
  // mode_type;
  isExpanded = false;
  // title;
  serial_number;
  created_at;
  // state;
  image;
  // price;
  // from_age;
  // to_age;
  endDate;
  // country;
  startTime;
  flag;
  type;
  endTime;
  updated_at;
  // schedules: any[] = [];
  // total_rating;
  course_user;
  acheduleTime;
  startDate;
  showFavValue = false;

  constructor(
    injector: Injector,
    private chats: ChatService,
    private globalCoursesService: GlobalCoursesService,
    private globalCourseFav: GlobalFavCoursesService
  ) {
    super(injector);
  }

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.course_id) {
      this.courseId = this.params.course_id;
      this.globalCoursesService.getItem(this.courseId).subscribe((data) => {
        this.course$ = data;
        this.callApi(data);
      });
    } else {
      this.nav.pop();
    }
  }

  async callApi(data): Promise<boolean> {
    if (this.sliderImages.length == 0) {
      const resImages = await this.network.getCourseImages({
        course_id: data.id,
      });
      this.sliderImages = resImages.result;
    }

    this.globalCourseFav.isItemExist('course_id', data.id).subscribe( count => {
      this.itemExistInFav$ = count > 0;

      let actions = this.bannerData.actions.map((action) => {
        if (action.name == 'favorite') {
          action.img = this.itemExistInFav$
            ? 'assets/svg/heart-78.svg'
            : 'assets/svg/heart-77.svg';
        }
        return action;
      });

      this.bannerData = {
        ...this.bannerData,
        actions
      };

    })

    

    this.bannerData = {
      liked_by_me: this.itemExistInFav$,
      sliderImages: this.sliderImages,
      actions: [
        {
          name: 'favorite',
          img: this.itemExistInFav$
              ? 'assets/svg/heart-78.svg'
              : 'assets/svg/heart-77.svg',
          action: null,
        },
        {
          name: 'share',
          img: 'assets/svg/share-77.svg',
          action: null,
        },
        {
          name: 'info',
          img: 'assets/svg/gray-info.svg',
          action: null,
        },
      ],
    };

    this.infoData = {
      title: data.title,
      currency_symbol: data?.auth_user_currency_symbol ?? '$',
      price: data?.updated_price ?? 0,
      rating: data.user.teacher.avg_rating ?? 0.0,
      total_rating: data.user.teacher.total_rating ?? 0,
      per_unit: '/lesson',
    };

    this;

    this.columnData = {
      colA: [
        {
          icon: 'assets/svg/time.svg',
          text: data.duration + ' hours / lesson',
        },
        {
          icon: 'assets/svg/globe-person.svg',
          text: data.mode_type == 'online' ? 'Online (live)' : data.mode_type,
        },
        {
          icon: 'assets/svg/cake2.svg',
          text: `Student Age ${data.from_age} - ${data.to_age}`,
        },
        {
          icon: 'assets/svg/locations.svg',
          text: '',
        },
      ] as infoColumnSingleItem[],
      colB: [
        {
          icon: 'assets/svg/create-course.svg',
          text: `Total ${data.lesson} lessons`,
        },
        {
          icon: 'assets/svg/minicute-group.svg',
          text: `${data.capacity}`,
        },
        {
          icon: 'assets/svg/speaks.svg',
          text: data.language.name,
        },
        {
          icon: 'assets/svg/course-type.svg',
          text: 'Workshop / Event',
        },
      ] as infoColumnSingleItem[],
    };

    this.aboutData = {
      heading: 'Details',
      text: data.description,
    };

    this.teacherData = {
      email: data.user.email,
      teacher_id: data.user.id,
      image: data.user.image,
      name: data.user.name,
      flag: this.utility.getFlag(data.user),
      country: data.user.teacher.country.name,
      icon: 'assets/svg/teacher-icon.svg',
      text: data.user.teacher.title,
    };

    this.scheduleData = {
      schedules: data.schedules,
    };

    let similarcourse_params = {
      course_id: data.id,
    };

    const similarcourses = await this.network.getSimilarCourses(
      similarcourse_params
    );

    this.coursesData = {
      heading: 'Similar Courses',
      list: similarcourses.result.data,
    };

    let reviews_params = {
      teacher_id: data.user.id,
      type: 'course',
    };

    const res = await this.network.getReviews(reviews_params);

    this.ratingData = {
      heading: 'Reviews',
      list: res.result,
    };

    return true;
  }

  async callImages(courseId) {}

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
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.user = this.users.getUser();
    console.log(this.user);
    const chatRoomId = (await this.chats.getChadRoomId(
      this.user.id,
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

  async presentAlert() {
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

  async requestTrail(id) {
    this.user = this.users.getUser();

    let v = (await this.profiles.isProfileCompleted(this.user)) as any;

    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {}, '', 0.7);
      // return
      let send = data.data.send;
      if (send == true) {
        this.trail = true;
        this.globalCoursesService.requestTrial(
          this.course$,
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
  async cancelTrail() {
    this.trail = false;
    let user = this.users.getUser();
    this.globalCoursesService.cancelTrail(this.course$, user);
  }

  async isTrailReq(): Promise<boolean> {
    this.loading = true;

    let user = this.users.getUser();

    let obj = {
      user_id: user.id,
      course_id: this.course_Id,
    };
    let res = await this.network.getTrail(obj);
    if (res && !res.trial) {
      this.loading = false;
    }
    if (res && res.trial) {
      this.loading = false;
    }

    return true;
  }

  // goToTeacher(user) {
  //   const params = {
  //     email: user.email,
  //   };
  //   this.nav.push('/teacher-profile', params);
  // }

  async getOtherCourse(event) {
    this.course_Id = event.id;
    // await this.callApi();
    this.content.scrollToTop(500); // 500ms animation duration
  }

  async addToFav() {
    let user = this.users.getUser();
    this.globalCoursesService.updateItem(this.courseId, 'is_liked_by_me', true);
    this.globalCourseFav.addFavorites(this.course$, user);
  }

  async removeToFav() {
    let user = this.users.getUser();
    this.globalCoursesService.updateItem(
      this.courseId,
      'is_liked_by_me',
      false
    );
    this.globalCourseFav.removeFavorites(this.course$, user);
  }

  async tapAction($event) {
    let obj = Object.assign({}, $event);
    if (obj.name == 'favorite') {
      this.course$.is_liked_by_me == true
        ? this.removeToFav()
        : this.addToFav();
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
      return {
        label: 'Free trial',
        icon: 'assets/svg/transfer.svg',
        action: 'requestTrail',
      };
    }

    if (!trail && status === 'Rejected') {
      return {
        label: 'Free trial',
        icon: 'assets/svg/transfer.svg',
        action: 'requestTrail',
      };
    }

    if (
      trail &&
      status !== 'Accepted' &&
      status !== 'Rejected' &&
      status !== 'Complete'
    ) {
      return {
        label: 'Cancel trial',
        icon: 'assets/svg/trail.svg',
        action: 'presentAlert',
      };
    }

    if (trail && status === 'Accepted') {
      return { label: 'Trial Accepted', icon: '', action: '' };
    }

    if (trail && status === 'Complete') {
      return {
        label: 'Trial Completed',
        icon: 'assets/svg/complete.svg',
        action: '',
      };
    }

    return null;
  }
}
