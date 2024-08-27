import { Component, Injector, Input, OnInit } from '@angular/core';
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
    console.log(value);

    console.log(value.user.image);
  }

  time;

  userRating: number = 0;
  review;
  user;
  constructor(injector: Injector) {
    super(injector);
    this.user = this.users.getUser();
  }

  ngOnInit() {
    console.log('sdf');
  }

  onRatingChange(newRating: number) {
    this.userRating = newRating;
    console.log('New rating:', newRating);
  }

  result(value) {
    this.review = value;
  }

  async addReview() {
    let obj = {
      rating: this.userRating,
      message: this.review,
      user_id: this.user.id,
      teacher_id: this.item.user.id,
    };
    console.log(obj);
    // return
    let res = await this.network.addReview(obj);
    console.log(res);
    if (res) {
      this.modals.dismiss();
    }
  }
  cancel() {
    this.modals.dismiss();
  }
}
