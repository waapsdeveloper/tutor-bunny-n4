import { GlobalStudyMaterialService } from './../../../../services/global-study-material.service';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-detail-material',
  templateUrl: './detail-material.page.html',
  styleUrls: ['./detail-material.page.scss'],
})
export class DetailMaterialPage extends BasePage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  material$;

  data;
  params;
  backUrl;
  materialId;
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
  otherCourseList: any[] = [];
  otherCourseListTotalCount: number = 0;
  user;
  canEditCourse = false;

  courseImages: string[] = []; // Images array
  currentIndex: number = 0;

  constructor(injector: Injector, private globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
  }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();

    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.material_id) {
      this.materialId = this.params.material_id;
      this.globalStudyMaterialService.getItem(this.materialId).subscribe((data) => {
        this.material$ = data;
        this.callApi(this.material$);
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

  async callApi(data) {
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

    if (this.data.category && this.data.category.length > 0) {
      this.categoryId = this.data.category[0].id;
      this.getOtherCourseList(this.data.id);
    }

    const uid = this.user.id;
    const cuid = this.data.user_id;
    if (uid == cuid) {
      this.canEditCourse = true;
    }
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
    this.nav.push('/courses');
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

  openEdit(){
    this.nav.push('/create-material', {
      material_Id: this.materialId,
      edit: true,
      type: this.data.type,
      showBack: true,
      title: 'Edit Material',
    });
  }
}
