import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { TeacherReviewsComponent } from './teacher-reviews/teacher-reviews.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  private _item: any;
  displayName;
  flag;
  user;
  courseId;
  rating
  status;
  blocked;
  reviewData;
  showReviewBtn = false;
  loading = false;
  trail = false;
  languageName: any;


  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.initialize(value);
    this.flag = this.getFlag();
    this.checkReview(value);
    this.status = value.trial ? value.trial.status : null;
  }
  constructor(injector: Injector, private globalCourses: GlobalCoursesService) {
    super(injector);
  }

  initialize(data) {
    this.displayName = this.utility.getAmericanName(this.item.user.name);

    this.rating = data.user.teacher.avg_rating

    if (data && data.trial) {
      this.blocked = data.trial.status;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.callApi();
    }, 200);
  }

  async checkReview(value) {
    console.log(value);

    let user = this.users.getUser();

    let obj = {
      user_id: user.id,
      teacher_id: value.user.id,
      course_id: value.id,
    };
    let res = await this.network.checkReview(obj);
    console.log(res);
    if (res.message === 'Review Data') {
      this.showReviewBtn = true;
      this.reviewData = res.resolvel;
    }
    console.log(this.showReviewBtn);
  }

  getFlag() {
    if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;
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

  async addToFav() {
    let user = this.users.getUser();

    this.item.is_liked_by_me = true;
    this.globalCourses.addFavorites(this.item, user);
  }

  async removeToFav() {
    let user = this.users.getUser();
    this.item.is_liked_by_me = false;
    this.globalCourses.removeFavorites(this.item, user);
  }

  async addReview(item) {
    let res = await this.modals.present(TeacherReviewsComponent, { item }, '', 0.7) as any ;
    console.log(res);
    if(res.data){
      this.showReviewBtn = true;
    }


  }



  async goToDeatil(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('student-course-detail', params);
  }



}
