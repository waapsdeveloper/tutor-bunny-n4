import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
import {
  bannerData,
  infoData,
  teacherCardInfo,
} from 'src/app/interfaces/detail-data';

@Component({
  selector: 'app-student-material-detail',
  templateUrl: './student-material-detail.page.html',
  styleUrls: ['./student-material-detail.page.scss'],
})
export class StudentMaterialDetailPage extends BasePage {
  [x: string]: any;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  material$;
  materialId;

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
    email: '',
    teacher_id: 0
  };

  materialData = {
    heading: 'Similar Materials',
    list: [],
  };

  data;
  params;
  backUrl;

  capacity;
  description;
  currencySymbol;
  loading = false;
  duration;
  isExpanded = false;
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
  otherMaterialList: any[] = [];
  otherMaterialListTotalCount: number = 0;
  user;
  canEditCourse = false;

  courseImages: string[] = []; // Images array
  currentIndex: number = 0;

  ratingData = {
    heading: 'Reviews',
    list: [],
  };

  constructor(
    injector: Injector,
    private globalStudyMaterialService: GlobalStudyMaterialService
  ) {
    super(injector);
  }

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();

    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.material_id) {
      this.materialId = this.params.material_id;
      this.globalStudyMaterialService
        .getItem(this.materialId)
        .subscribe((data) => {
          this.material$ = data;
          this.callApi(this.material$);
        });
    }
  }

  // prevImage() {
  //   this.currentIndex =
  //     this.currentIndex > 0
  //       ? this.currentIndex - 1
  //       : this.courseImages.length - 1;
  // }

  // nextImage() {
  //   this.currentIndex =
  //     this.currentIndex < this.courseImages.length - 1
  //       ? this.currentIndex + 1
  //       : 0;
  // }

  async callApi(data) {
    console.log(data);
    const resImages = await this.network.getMaterialImages({
      study_material_id: data.id,
    });

    console.log(resImages);
    this.bannerData = {
      liked_by_me: data.is_liked_by_me,
      sliderImages: resImages.result,
      actions: [],
    };

    this.infoData = {
      title: data.title,
      currency_symbol: data?.auth_user_currency_symbol ?? '$',
      price: data?.updated_price ?? 0,
      rating: data.user.teacher.avg_rating ?? 0.0,
      total_rating: data.user.teacher.total_rating ?? 0,
      per_unit: '/lesson',
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
      email: data.user.email,
      teacher_id: data.user.id,
    };

    const materialList = await this.getotherMaterialList(data.id);
    this.materialData = {
      heading: 'Similar Materials',
      list: materialList,
    };

    this.loading = true;
    this.user = this.users.getUser();

    this.data = data;
    this.title = this.data.title;
    this.language = this.data.language.name;
    this.capacity = this.data.capacity;
    this.mode_type = this.data.mode_type;
    this.description = this.formatDescription(this.data.description); // Process the description
    this.from_age = this.data.from_age;
    this.to_age = this.data.to_age;
    this.displayName = this.utility.getAmericanName(this.data.user.name);
    this.duration = this.data.duration;
    this.serial_number = this.data.serial_number;
    this.lessons = this.data.lesson;
    this.country = this.data.user.teacher.country.name;
    this.state = this.data.user.teacher.state.name;
    this.image = this.data.image;
    this.rating = this.data.user.teacher.avg_rating;
    this.total_rating = this.data.user.teacher.total_rating;
    this.price = this.data.price;
    this.type = this.data.type;
    this.schedules = this.data.schedules;
    this.flag = this.getFlag();
    this.currencySymbol = this.data?.auth_user_currency_symbol;
    this.created_at = this.data.created_at;
    this.updated_at = this.data.updated_at;
    this.loading = false;

    const startDate = this.data.start_date;
    this.startDate = startDate ? moment(startDate).format('DD-MM-Y') : '';

    const endDate = this.data.end_date;
    this.endDate = endDate ? moment(endDate).format('DD-MM-Y') : '';

    const uid = this.user.id;
    const cuid = this.data.user_id;
    if (uid == cuid) {
      this.canEditCourse = true;
    }

    let reviews_params = {
      teacher_id: this.data.user.id,
      type: 'course',
    };

    const ratings = await this.network.getReviews(reviews_params);

    this.ratingData = {
      heading: 'Reviews',
      list: ratings.result,
    };
  }

  formatDescription(description: string): string {
    if (!description) return '';
    return description.replace(/\n/g, '<br>');
  }

  async getotherMaterialList(id): Promise<any[]> {
    let user = this.users.getUser();
    const obj = {
      user_id: user['id'],
      except_material_id: id,
    };
    const res = await this.network.getotherMaterialList(obj);
    const result = res.result;
    this.otherMaterialListTotalCount = result.total;
    this.otherMaterialList = result.data;
    return res.result.data;
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
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
    // this.nav.push('/courses');
  }

  openDetails() {
    const params = {
      material_Id: this.materialId,
      edit: true,
      type: this.data.type,
      showBack: true,
      title: 'Edit Course',
    };
    this.nav.push('/material-form', params);
  }

  getOtherCourse(event) {
    this.materialId = event.id;
    // this.callApi();

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
    this.material$.is_liked_by_me = true;
    // this.courseFavoriteService.addFavorites(this.course$, user);
  }

  async removeToFav() {
    // let showFav = false;
    // this.events.publish('show-fav-dot', showFav);
    let user = this.users.getUser();
    this.material$.is_liked_by_me = false;
    // this.courseFavoriteService.removeFavorites(this.course$, user);
  }

  openEdit() {
    this.nav.push('/create-material', {
      material_Id: this.materialId,
      edit: true,
      type: this.data.type,
      showBack: true,
      title: 'Edit Material',
    });
  }

  goToChat() {}
}
