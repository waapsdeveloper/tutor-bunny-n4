import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { TrailMessageComponent } from 'src/app/components/trail-message/trail-message.component';
import { ChatService } from 'src/app/services/chat.service';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { StudentWelcomeComponent } from '../student-dashboard/student-welcome/student-welcome.component';
import { bannerData, infoColumnSingleItem, infoData, teacherCardInfo } from 'src/app/interfaces/detail-data';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.page.html',
  styleUrls: ['./student-course-detail.page.scss'],
})
export class StudentCourseDetailPage extends BasePage {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  course$;
  courseId;

  bannerData: bannerData = {
    liked_by_me: false,
    sliderImages: [],
    actions: []
  }

  infoData: infoData = {
    title: '', 
    currency_symbol: '',
    price: '',
    rating: 0.0,
    total_rating: 0,
    per_unit: '/lesson'
  };

  columnData = {
    colA: [],
    colB: []
  }

  aboutData = {
    heading: 'Details',
    text: ''
  }

  teacherData: teacherCardInfo = {
    image: '',
    name: '',
    flag: '',
    country: '',
    icon: '',
    text: ''
  }

  scheduleData = {
    schedules: []
  };

  coursesData = {
    heading: 'Similar Courses',
    list: []
  }

  ratingData = {
    heading: 'Reviews',
    list: []
  }

  params;

  backUrl;
  displayName;
  course_Id;
  // lessons;
  btn_loading = false;
  teacher;
  user
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




  constructor(injector: Injector,
    private chats: ChatService,
    public globalCoursesService: GlobalCoursesService) {
    super(injector);
  }

  // ngOnInit(): void {
    
  // }

  async ionViewWillEnter() {

    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.course_id) {
      
      this.courseId = this.params.course_id;
      this.globalCoursesService.getItem(this.courseId).subscribe((data) => {
        this.course$ = data;
        this.callApi(this.course$);
      });

    } else {
      this.nav.pop();
    }
    // this.spinner = true;

    
    // this.isTrailReq();
  }

  async callApi(data): Promise<boolean> {

    console.log(data);
    const resImages = await this.network.getCourseImages({
      course_id: data.id,
    })

    console.log(resImages)
    this.bannerData = {
      liked_by_me: data.is_liked_by_me,
      sliderImages: resImages.result,
      actions: [              
          {
            name: 'favorite',
            img: 'assets/svg/heart-77.svg',
            action: null
          },
          {
            name: 'share',
            img: 'assets/svg/share-77.svg',
            action: null
          },
          {
            name: 'info',
            img: 'assets/svg/gray-info.svg',
            action: null
          }
      ]
    }

    this.infoData = {
      title: data.title,
      currency_symbol: data?.auth_user_currency_symbol ?? '$',
      price: data?.updated_price ?? 0,
      rating: data.user.teacher.avg_rating ?? 0.0,
      total_rating: data.user.teacher.total_rating ?? 0,
      per_unit: '/lesson'    
    }

    this.columnData = {
      colA: [
        {
          icon: 'assets/svg/time.svg',
          text: data.duration + ' hours / lesson'
        },
        {
          icon: 'assets/svg/globe-person.svg',
          text: data.mode_type == 'online' ? 'Online (live)' : data.mode_type
        },
        {
          icon: 'assets/svg/cake2.svg',
          text: `Student Age ${data.from_age} - ${data.to_age}`
        },
        {
          icon: 'assets/svg/locations.svg',
          text: ''
        }
      ] as infoColumnSingleItem[],
      colB: [
        {
          icon: 'assets/svg/create-course.svg',
          text: `Total ${data.lesson} lessons` 
        },
        {
          icon: 'assets/svg/minicute-group.svg',
          text: `${data.capacity}`
        },
        {
          icon: 'assets/svg/speaks.svg',
          text: data.language.name
        },
        {
          icon: 'assets/svg/course-type.svg',
          text: 'Workshop / Event'
        }
      ] as infoColumnSingleItem[]
    }

    this.aboutData = {
      heading: 'Details',
      text: data.description
    }

    this.teacherData = {
      image: data.user.image,
      name: data.user.name,
      flag: this.utility.getFlag(data.user),
      country: data.user.teacher.country.name,
      icon: 'assets/svg/teacher-icon.svg',
      text: data.user.teacher.title
    }

    this.scheduleData = {
      schedules: data.schedules,
    }

    let similarcourse_params = {
      course_id: data.id
    }

    const similarcourses = await this.network.getSimilarCourses(similarcourse_params);
    
    this.coursesData = {
      heading: 'Similar Courses',
      list: similarcourses.result.data
    }

    let reviews_params= {
      teacher_id: data.user.id,
      type: 'course'
    };

    const res = await this.network.getReviews(reviews_params);
    
    this.ratingData = {
      heading: 'Reviews',
      list: res.result
    }
    // let res = (await this.globalCourses.getcourseById(this.course_Id)) as any;

    // this.teacher = data.user;
    // localStorage.setItem('teacher', JSON.stringify(this.teacher));

    // this.events.publish('data-for-other-corses', this.data);
    //this.title = this.data.title;
    // this.capacity = this.data.mode_type;
    // this.mode_type = this.data.mode_type;
    // this.description = this.data.description;
    // this.language = this.data.language.name;
    // this.from_age = this.data.from_age;
    // this.to_age = this.data.to_age;
    // this.displayName = this.utility.splitName(this.data.user.name).first_name;
    // this.flag = this.getFlag();
    //this.duration = this.data.capacity;
    // this.serial_number = this.data.serial_number;
    // this.price = this.data.updated_price;
    //this.schedules = this.data.schedules;
    // this.acheduleTime = this.schedules;
    //this.lessons = this.data.lesson;
    // this.created_at = this.data.created_at;
    // this.techerTitle = this.data.user.teacher.title;
    // this.course_user = this.data.user;
    // this.image = this.data.image;
    // this.rating = this.data.user.teacher.avg_rating;
    // this.total_rating = this.data.user.teacher.total_rating;
    // this.techerImg = this.data.user.image;
    // this.country = this.data.user.teacher.country.name;
    // this.state = this.data.user.teacher.state.name;
    // this.updated_at = this.data.updated_at;
    // this.type = this.data.type;
    // this.currencySymbol = this.data?.auth_user_currency_symbol;
    // const startTime = this.acheduleTime.start_date;
    // const endTime = this.acheduleTime.end_date;
    // this.startTime = moment(startTime).format('hh:mm a');
    // this.endTime = moment(endTime).format('hh:mm a');
    // this.showFavValue = this.data.is_liked_by_me;
    // if (this.data.start_date) {
    //   const startDate = this.data.start_date;
    //   this.startDate = moment(startDate).format('DD-MMM-YYYY');
    // }

    // if (this.data.end_date) {
    //   const endDate = this.data.end_date;
    //   this.endDate = moment(endDate).format('DD-MMM-YYYY');
    // }

    

    

    

    // this.acheduleTime = this.scheduleData.schedules;
    // const endTime = this.acheduleTime.end_date;
    // const startTime = this.acheduleTime.start_date;
    // this.startTime = moment(startTime).format('hh:mm a');
    // this.endTime = moment(endTime).format('hh:mm a');
    
    // this.countData = {
    //   duration: this.data.capacity,
    //   lessons: this.data.lesson,
    //   mode_type: this.data.mode_type,
    //   capacity: this.data.mode_type,
    //   from_age: this.data.from_age,
    //   to_age: this.data.to_age,
    //   language: this.data.language.name,
    //   state: this.data.user.teacher.state.name,
    //   country: this.data.user.teacher.country.name,
    // }

    // this.spinner = false;

    return true;
  }

  // async addToFav() {
  //   let user = this.users.getUser();

  //   this.data.is_liked_by_me = true;
  //   this.showFavValue = true;
  //   this.courseFavoriteService.addFavorites(this.data, user);
  // }

  // async removeToFav() {
  //   let user = this.users.getUser();

  //   this.data.is_liked_by_me = false;
  //   this.showFavValue = false;
  //   this.courseFavoriteService.removeFavorites(this.data, user);
  // }


  // async goToChat() {
  //   this.user = this.users.getUser();
  //   let v = (await this.profiles.isProfileCompleted(this.user)) as any;
  //   if (v || v == true) {


  //     let id = this.user.id;
  //     let obj = {
  //       user_id_1: this.user.id,
  //       user_id_2: this.course_user.id,
  //     };
  //     let res = await this.network.getChadRoomId(obj);
  //     let params = {
  //       student_id: id,
  //       other_user_id: this.course_user.id,
  //       user: JSON.stringify(this.course_user),
  //       chat_room_id: res.chat_room.id,
  //     };
  //     this.nav.push('/tabs/chat', params);
  //   } else {
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
  async goToChat() {
    let user = this.users.getUser();

    let v = (await this.profiles.isProfileCompleted(user)) as any;
    if (!v) {
      await this.openWelcomeComponent();
      return;
    }

    this.openChatWithData();
  }

  async openChatWithData() {
    this.teacher = JSON.parse(localStorage.getItem('teacher'));
    this.user = this.users.getUser();
    const chatRoomId = await this.chats.getChadRoomId(this.course_user.id, this.user.id) as number;

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

  async requestTrail() {
    this.btn_loading = true;

    let user = this.users.getUser();
    let v = (await this.profiles.isProfileCompleted(user)) as any;
    if (v || v == true) {
      let data = await this.modals.present(TrailMessageComponent, {}, '', 0.7);
      let send = data.data.send;
      if (send == true) {
        // await this.globalCourses.requestTrial(
        //   this.data,
        //   user,
        //   data.data.message
        // );
        // await this.callApi();
        // this.events.publish('update-course-list');
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
    this.btn_loading = false

  }

  async cancelTrail() {
    this.btn_loading = true;
    let user = this.users.getUser();
    // await this.globalCourses.cancelTrail(this.data, user);
    // await this.callApi();
    this.btn_loading = false;
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
  
  goToTeacher(user) {
    const params = {
      email: user.email,
    };
    this.nav.push('/teacher-profile', params);
  }

  async getOtherCourse(event) {
    this.course_Id = event.id;
    // await this.callApi();
    this.content.scrollToTop(500); // 500ms animation duration
  }
}
