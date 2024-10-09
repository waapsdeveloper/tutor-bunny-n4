import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-reviews-by-student',
  templateUrl: './reviews-by-student.page.html',
  styleUrls: ['./reviews-by-student.page.scss'],
})
export class ReviewsByStudentPage extends BasePage implements OnInit {
  user;
  reviews;
  teacher;
  image;
  rating;
  constructor(injector: Injector) {
    super(injector);
    let role_id = localStorage.getItem('role')
    if (role_id == '3') {
      this.user = this.users.getUser();
      this.rating = this.user.teacher.avg_rating;
      this.image = this.user.image;
      this.callApi(this.user.id);
    } else {
      this.user = JSON.parse(localStorage.getItem('teacher'));
      console.log(this.user);
      this.rating = this.user.teacher.avg_rating;
      this.image = this.user.image;
      this.callApi(this.user.id);
    }
  }

  async callApi(id) {
    let obj = {
      teacher_id: id,
    };

    let res = await this.network.getReviews(obj);
    console.log(res);

    this.reviews = res.result;
  }

  back() {
    this.nav.pop();
  }
  ngOnInit() {}
}
