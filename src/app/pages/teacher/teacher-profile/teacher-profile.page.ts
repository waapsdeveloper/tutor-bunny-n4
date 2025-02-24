import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTeacherService } from 'src/app/services/global-teacher.service';
import * as moment from 'moment';
import { UsersService } from 'src/app/services/users.service';
import { ExpQulRetroComponent } from 'src/app/components/exp-qul-retro/exp-qul-retro.component';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage
  extends BasePage
  implements OnInit, ViewWillEnter
{

  // user;
  // displayName;
  // flag;
  // showGellary = false;
  // item;
  // data;
  // shield;
  // isExpanded = false;
  // country;
  // loading = false;
  // city;
  // email;
  // language;
  // verified_on;
  // teacher;
  // total_rating;
  // rating;
  // state;
  // status;
  // student;
  // hourly_rate;
  // travel_policy;
  // subject;
  // total_course;
  // images: any;
  // params;
  // studentEmail;
  // course;
  // courses;
  // roleId;
  // experince;
  // updateRating;
  // updateTotalRating;

  // constructor(injector: Injector, public globalCourses: GlobalCoursesService, private chats: ChatService) {
  //   super(injector);
  // }
  // async ngOnInit() {
  //   this.events.subscribe(
  //     'rating-rec-update-by-id',
  //     this.initialize.bind(this)
  //   );
  //   this.user = this.users.getUser();

  //   this.params = this.nav.getQueryParams();
  //   if (this.params.email) {
  //     this.studentEmail = this.params.email;
  //   }
  //   this.initialize();
  // }

  // getCourses(events) {
  //   this.course = events.total;
  // }

  // async ionViewWillEnter() {
  //   let obj = {
  //     search: 'search',
  //     page: 1,
  //   };
  //   this.roleId = localStorage.getItem('role');
  //   if (this.teacher) {
  //     if (this.roleId == '3') {
  //       let id = this.user.id;
  //       const res = (await this.network.getMyCourseList(obj, id)) as any;
  //     } else {
  //       let id = this.teacher.id;
  //       const res = (await this.network.getMyCourseList(obj, id)) as any;
  //     }
  //   }
  // }

  // async initialize() {

  //   this.loading = true;
  //   this.roleId = localStorage.getItem('role');

  //   if (this.roleId == '3') {
  //     this.email = this.user.email;
  //   } else {
  //     this.email = this.studentEmail;
  //   }
  //   let obj = {
  //     email: this.email,
  //   };
  //   let res = await this.network.getUserByEmail(obj);

  //   if (this.roleId == '3') {
  //     if (res) {
  //       // this.users.setUser(res.user);
  //       // this.user = this.users.getUser();

  //       this.flag = this.getFlag();
  //       this.displayName = this.utility.getAmericanName(this.user.name);
  //       this.country = this.user.teacher.country.name;
  //       this.state = this.user.teacher.state.name;
  //       this.hourly_rate = this.user.teacher.hourly_rate;
  //       this.city = this.user.teacher.city;
  //       const verified_on = this.user.verified_on;
  //       this.verified_on = moment(verified_on).format('DD-MMM-YYYY');
  //       this.language = this.user.teacher.languages;
  //       this.total_rating = this.user.teacher.total_rating;
  //       this.status = this.user.teacher.status;
  //       this.rating = this.user.teacher.avg_rating;
  //       this.travel_policy = this.user.teacher.travel_policy.name;
  //       this.subject = this.user.teacher.subjects;
  //       this.experince = this.user.teacher.started_teaching;
  //       const user = this.users.getUser();
  //       const data = (await this.network.getImage(user.id)) as any;
  //       this.images = data.result;
  //       if (this.images.length != 0) {
  //         this.showGellary = true;
  //       }
  //     }
  //   } else {
  //     this.user = res.user;

  //     this.flag = this.getFlag();
  //     const verified_on = this.user.verified_on;
  //     this.verified_on = moment(verified_on).format('DD-MMM-YYYY');
  //     this.displayName = this.utility.getAmericanName(this.user.name);
  //     this.country = this.user.teacher.country.name;
  //     this.state = this.user.teacher.state.name;
  //     this.city = this.user.teacher.city;
  //     this.hourly_rate = this.user.teacher.converted_hourly_rate;
  //     this.travel_policy = this.user.teacher.travel_policy.name;
  //     this.language = this.user.teacher.languages;
  //     this.total_rating = this.user.teacher.total_rating;
  //     this.rating = this.user.teacher.avg_rating;
  //     this.status = this.user.teacher.status;

  //     this.subject = this.user.teacher.subjects;
  //     this.experince = this.user.teacher.started_teaching;
  //     // const user = this.users.getUser();
  //     const data = (await this.network.getImage(res.user.id)) as any;
  //     this.images = data.result;
  //     if (this.images.length != 0) {
  //       this.showGellary = true;
  //     }
  //   }
  //   this.loading = false;
  // }

  // getFlag() {
  //   if (this.user && this.user.teacher && this.user.teacher.country) {
  //     const flag = this.user.teacher.country.iso2;
  //     if (flag) {
  //       return flag.toLowerCase();
  //     } else {
  //       return '';
  //     }
  //   } else {
  //     return '';
  //   }
  // }

  // toggleReadMore() {
  //   this.isExpanded = !this.isExpanded;
  // }

  // openQulification() {
  //   let user = this.user;

  //   this.modals.present(TeacherQualificationComponent, { user });
  // }

  // async goToChat(data) {
  //   let user = this.users.getUser();

  //   let v = (await this.profiles.isProfileCompleted(user)) as any;
  //   if (!v) {
  //     await this.openWelcomeComponent();
  //     return;
  //   }
  //   this.openChatWithData(data);
  // }

  // async openChatWithData(data) {
  //   this.user = this.users.getUser();
  //   const chatRoomId = await this.chats.getChadRoomId(data.id, this.user.id) as number;

  //   if(chatRoomId != -1){
  //     this.nav.push('messages', {
  //       chat_room_id: chatRoomId
  //     })
  //   }
  // }

  // async openWelcomeComponent() {
  //   let res = await this.modals.present(
  //     StudentWelcomeComponent,
  //     {},
  //     'auto-height-modal',
  //     1,
  //     [0, 1],
  //     false
  //   );
  //   let key = res.data.key;
  //   if (key == 1) {
  //     this.nav.push('/student-profile/student-profile-edit', {
  //       showBack: true,
  //     });
  //   }
  // }
  headerData = {
    image: '',
    displayName: '',
    verifiedOn: '',
    rating: 0,
    totalRating: 0,
    is_edit: true,
  };

  loading = false;
  user: any;
  teacher$;
  teacherId;
  params;
  backUrl;
  videoBox;
  infoData = {
    subjects: [],
    languages: [],
    travel_policy: '',
    country: '',
    city: '',
    state: '',
    flag: '',
  };

  countData = {
    years_of_experience: 0,
    course_count: 0,
    notes_count: 0,
    currency_symbol: '',
    hourly_rate: 0,
  };

  aboutData = {
    heading: 'About',
    text: '',
  };

  courseData = {
    heading: 'Courses & Study Notes',
    list: [],
  };

  galleryData = {
    heading: 'Gallery',
    list: [],
  };

  ratingData = {
    heading: 'Reviews',
    list: [],
  };

  expQulData = {
    heading: 'Experience',
    experience: '',
    qualification: ''
  }

  constructor(
    injector: Injector,
    public globalTeacherService: GlobalTeacherService,
    private userService: UsersService
  ) {
    super(injector);
  }

  ngOnInit() {
    console.log();
    const params = this.nav.getQueryParams();

    if (params['email']) {
      this.initialize(params['email']);
    }
  }

  async ionViewWillEnter() {
    let user = this.userService.getUser();
    console.log(user, 'i am a user');
    this.teacherId = user.id;
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    let res = await this.network.teacherById(this.teacherId);
    console.log('hello', res.result);
    this.teacher$ = res.result;
    this.callApi(this.teacher$);
  }

  async callApi(data): Promise<boolean> {
    console.log(data);

    const user = data;

    this.headerData = {
      image: user.image,
      displayName: this.utility.getAmericanName(user.name),
      verifiedOn:
        user.verified_on == null
          ? moment(user.verified_on).format('DD-MMM-YYYY')
          : 'In Review',
      rating: user.teacher.avg_rating,
      totalRating: user.teacher.total_rating,
      is_edit: true,
    };

    this.infoData = {
      subjects: user.teacher.subjects,
      languages: user.teacher.languages,
      travel_policy: user.teacher.travel_policy.name,
      country: user.teacher.country.name,
      city: user.teacher.city,
      state: user.teacher.state.name,
      flag: this.utility.getFlag(user),
    };

    this.aboutData = {
      heading: 'About',
      text: user.teacher.description || '',
    };

    let reviews_params = {
      teacher_id: user.id,
      type: 'course',
    };

    const ratings = await this.network.getReviews(reviews_params);

    this.ratingData = {
      heading: 'Reviews',
      list: ratings.result,
    };

    let obj = {
      email: user.email,
    };

    let res = await this.network.getStudentTeacherProfileByEmail(obj);

    this.countData = {
      years_of_experience: user.teacher.started_teaching,
      course_count: res.course_material.total_courses,
      notes_count: res.course_material.total_material,
      currency_symbol: user.teacher.auth_user_currency_symbol,
      hourly_rate: user.teacher.converted_hourly_rate,
    };

    this.courseData = {
      heading: 'Courses & Study Notes',
      list: res.course_material.list,
    };

    this.galleryData = {
      heading: 'Gallery',
      list: res.gallery,
    };
    this.videoBox = {
      user_id: user.id,
    };


    this.expQulData = {
      heading: 'Experience',
      experience: this.teacher$.teacher.experience_description,
      qualification: this.teacher$.teacher.qualification_description,
    }

    return true;
  }

  async initialize(email) {
    this.loading = true;

    let obj = {
      email: email,
    };

    let res = await this.network.getStudentTeacherProfileByEmail(obj);

    console.log(res);
    this.user = res.user;

    this.headerData = {
      image: this.user.image,
      displayName: this.utility.getAmericanName(this.user.name),
      verifiedOn: this.user.verified_on
        ? moment(this.user.verified_on).format('DD-MMM-YYYY')
        : null,
      rating: this.user.teacher.avg_rating,
      totalRating: this.user.teacher.total_rating,
      is_edit: true,
    };

    this.infoData = {
      subjects: this.user.teacher.subjects,
      languages: this.user.teacher.languages,
      travel_policy: this.user.teacher.travel_policy.name,
      country: this.user.teacher.country.name,
      city: this.user.teacher.city,
      state: this.user.teacher.state.name,
      flag: this.getFlag(),
    };

    this.countData = {
      years_of_experience: this.user.teacher.started_teaching,
      course_count: res.course_material.total_courses,
      notes_count: res.course_material.total_material,
      currency_symbol: this.user.teacher.auth_user_currency_symbol,
      hourly_rate: this.user.teacher.converted_hourly_rate,
    };

    this.aboutData = {
      heading: 'About',
      text: this.user.teacher.description || '',
    };

    this.courseData = {
      heading: 'Courses & Study Notes',
      list: res.course_material.list,
    };

    this.galleryData = {
      heading: 'Gallery',
      list: res.gallery,
    };

    this.ratingData = {
      heading: 'Reviews',
      list: res.reviews,
    };

    this.loading = false;

    //   const verified_on = this.user.verified_on;
    //   this.verified_on = moment(verified_on).format('DD-MMM-YYYY');
    //   this.displayName = this.utility.getAmericanName(this.user.name);
    //   this.country = this.user.teacher.country.name;
    //   this.state = this.user.teacher.state.name;
    //   this.city = this.user.teacher.city;
    //   this.hourly_rate = this.user.teacher.converted_hourly_rate;
    //   this.travel_policy = this.user.teacher.travel_policy.name;
    //   this.language = this.user.teacher.languages;
    //   this.total_rating = this.user.teacher.total_rating;
    //   this.rating = this.user.teacher.avg_rating;
    //   this.status = this.user.teacher.status;

    // this.subject = this.user.teacher.subjects;
    //   this.experince = this.user.teacher.started_teaching;
    //   // const user = this.users.getUser();
    //   const data = (await this.network.getImage(res.user.id)) as any;
    //   this.images = data.result;
    //   if (this.images.length != 0) {
    //     this.showGellary = true;
    //   }
    // }
    // this.loading = false;
  }

  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  clickOpenCourse($event) {
    console.log($event);
  }

  // async goToChat() {
  //   let student = this.users.getUser();

  //   let v = (await this.profiles.isProfileCompleted(student)) as any;
  //   if (!v) {
  //     await this.openWelcomeComponent();
  //     return;
  //   }
  //   this.openChatWithData();
  // }

  // async openChatWithData() {
  //     let student = this.users.getUser();
  //     const chatRoomId = await this.chats.getChadRoomId(this.user.id, student.id) as number;

  //     if(chatRoomId != -1){
  //       this.nav.push('messages', {
  //         chat_room_id: chatRoomId
  //       })
  //     }
  //   }

  //   async openWelcomeComponent() {
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

  openEditProfile() {
    this.nav.push('/teacher-profile/teacher-profile-edit', {
      backUrl: '/tabs/teacher-profile?user_id=' + this.user.id,
      showBack: true,
      title: 'Edit Profile',
    });
  }
  back() {
    localStorage.removeItem('teacher');
    this.nav.pop();
  }

  goToQualifications() {

    const modal = this.modals.present(ExpQulRetroComponent, {
      data: this.expQulData
    }, 'full-height-modal', 0.7, [0, 1]);

  }
}
