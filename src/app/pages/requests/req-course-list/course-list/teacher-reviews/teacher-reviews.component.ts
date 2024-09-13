import { Component, Injector, Input, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-teacher-reviews',
  templateUrl: './teacher-reviews.component.html',
  styleUrls: ['./teacher-reviews.component.scss'],
})
export class TeacherReviewsComponent extends BasePage implements OnInit {
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;

    this.displayName = this.utility.getAmericanName(value.user.name);
  }

  time;
  showError;
  userRating: number = 0;
  review = false;
  user;
  displayName;
  constructor(injector: Injector) {
    super(injector);
    this.user = this.users.getUser();
  }

  ngOnInit() {}

  onRatingChange(newRating: number) {
    this.userRating = newRating;
  }

  result(value) {
    this.review = value;
  }

  async addReview() {
    if (this.userRating <= 1) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
      return;
    }
    let obj = {
      rating: this.userRating,
      message: this.review,
      user_id: this.user.id,
      course_id: this.item.id,
      teacher_id: this.item.user.teacher.teacher_id,
    };
    // return
    let res = await this.network.addReview(obj);
    if (res && res.message) {
      const message = 'Review submitted';
      this.utility.presentSuccessToast(message);
      this.modals.dismiss();
    }
  }

  async presentAlert() {
    const flag = await this.utility.presentConfirm(
      'OK',
      'Cancel',
      'Submit Review',
      'Are you sure to submit the Review?'
    );

    if (flag) {
      this.addReview();
    }
  }

  cancel() {
    this.modals.dismiss();
  }
}
