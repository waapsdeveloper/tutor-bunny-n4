import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';
import { CourseFavoriteService } from 'src/app/services/course-favorite.service';
import {
  bannerData,
  infoColumnSingleItem,
  infoData,
  teacherCardInfo,
} from 'src/app/interfaces/detail-data';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage extends BasePage {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  course$;
  courseId;

  bannerData: bannerData = {
    liked_by_me: false,
    sliderImages: [],
    actions: []
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
    list: []
  }

  data;
  params;
  backUrl;

  capacity;
  description;
  currencySymbol;
  loading = false;
  duration;

  title;
  type;
  serial_number;
  mode_type;
  rating;
  created_at;
  price;
  startTime;
  country;
  state;
  flag;
  displayName;
  image;
  endTime;
  from_age;
  language;
  to_age;
  updated_at;
  total_rating;
  lessons;
  schedules: any[] = [];
  startDate;
  endDate;
  categoryId;
  otherCourseList: any[] = [];
  otherCourseListTotalCount: number = 0;
  user;
  canEditCourse = false;

  courseImages: string[] = []; // Images array
  currentIndex: number = 0;

  constructor(
    injector: Injector,
    private globalCoursesService: GlobalCoursesService,
    private courseFavoriteService: CourseFavoriteService
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
        this.callApi(this.course$);
      });
    }
  }

  prevImage() {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.courseImages.length - 1;
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex < this.courseImages.length - 1
        ? this.currentIndex + 1
        : 0;
  }

  async callApi(data): Promise<boolean> {
    console.log(data);
    const resImages = await this.network.getCourseImages({
      course_id: data.id,
    });

    console.log(resImages);
    this.bannerData = {
      liked_by_me: data.is_liked_by_me,
      sliderImages: resImages.result,
      actions: [              
        {
          name: 'edit',
          img: 'assets/svg/edit-pencil-77.svg',
          action: null
        },
        {
          name: 'share',
          img: 'assets/svg/share-77.svg',
          action: null
        },
    ]
    };

    this.infoData = {
      title: data.title,
      currency_symbol: data?.auth_user_currency_symbol ?? '$',
      price: data?.updated_price ?? 0,
      rating: data.user.teacher.avg_rating ?? 0.0,
      total_rating: data.user.teacher.total_rating ?? 0,
      per_unit: '/lesson',
    };

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

    const obj = {
      user_id: data.user['id'],
      except_course_id: data.id,
    };
    const similarcourses = await this.network.getOtherCourseList(obj);

    this.coursesData = {
      heading: 'Other Courses',
      list: similarcourses.result.data,
    };

    let reviews_params= {
      teacher_id: data.user.id,
      type: 'course'
    };

    const res = await this.network.getReviews(reviews_params);

    this.ratingData = {
      heading: 'Reviews',
      list: res.result
    }




    // this.loading = true;
    // this.user = this.users.getUser();
    // // let res = (await this.network.getcourseById(this.course_Id)) as any;
    // this.data = data;
    // this.title = this.data.title;
    // this.language = this.data.language.name;
    // this.capacity = this.data.capacity;
    // this.mode_type = this.data.mode_type;
    // this.description = this.formatDescription(this.data.description); // Process the description
    // this.from_age = this.data.from_age;
    // this.to_age = this.data.to_age;
    // this.displayName = this.utility.getAmericanName(this.data.user.name);
    // this.duration = this.data.duration;
    // this.serial_number = this.data.serial_number;
    // this.lessons = this.data.lesson;
    // this.country = this.data.user.teacher.country.name;
    // this.state = this.data.user.teacher.state.name;
    // this.image = this.data.image;
    // this.rating = this.data.user.teacher.avg_rating;
    // this.total_rating = this.data.user.teacher.total_rating;
    // this.price = this.data.price;
    // this.type = this.data.type;
    // this.schedules = this.data.schedules;
    // this.flag = this.getFlag();
    // this.currencySymbol = this.data?.auth_user_currency_symbol;
    // this.created_at = this.data.created_at;
    // this.updated_at = this.data.updated_at;
    // this.loading = false;

    // const startDate = this.data.start_date;
    // this.startDate = startDate ? moment(startDate).format('DD-MM-Y') : '';

    // const endDate = this.data.end_date;
    // this.endDate = endDate ? moment(endDate).format('DD-MM-Y') : '';

    // // if (this.data.category && this.data.category.length > 0) {
    // //   this.categoryId = this.data.category[0].id;
    // //   this.getOtherCourseList(this.data.id);
    // // }

    // const uid = this.user.id;
    // const cuid = this.data.user_id;
    // if (uid == cuid) {
    //   this.canEditCourse = true;
    // }

    return true;
  }

  formatDescription(description: string): string {
    if (!description) return '';
    return description.replace(/\n/g, '<br>');
  }

  async getOtherCourseList(id) {
    let user = this.users.getUser();
    const obj = {
      user_id: user['id'],
      except_course_id: id,
    };
    const res = await this.network.getOtherCourseList(obj);
    const result = res.result;
    this.otherCourseListTotalCount = result.total;
    this.otherCourseList = result.data;
  }

  getFlag() {
    if (this.data && this.data.user.teacher && this.data.user.teacher.country) {
      const flag = this.data.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  openOtherCourses($event) {
    this.nav.push('/courses');
  }

  openDetails() {
    const params = {
      course_Id: this.courseId,
      edit: true,
      type: this.data.type,
      showBack: true,
      title: 'Edit Course',
    };
    this.nav.push('/course-form', params);
  }

  getOtherCourse(event) {
    this.courseId = event.id;

    this.content.scrollToTop(500); // 500ms animation duration

    //
    // // this.callApi();
    // this.nav.push('/course-detail', {
    //   id: event.id
    // })
  }

  async addToFav() {
    // let showFav = true;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.course$.is_liked_by_me = true;
    this.courseFavoriteService.addFavorites(this.course$, user);
  }

  async removeToFav() {
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.course$.is_liked_by_me = false;
    this.courseFavoriteService.removeFavorites(this.course$, user);
  }
}
