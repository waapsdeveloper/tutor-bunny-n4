import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-reviews-by-student',
  templateUrl: './reviews-by-student.page.html',
  styleUrls: ['./reviews-by-student.page.scss'],
})
export class ReviewsByStudentPage extends BasePage implements OnInit {

  user
  reviews;
  image
  rating;
  constructor(injector:Injector) {
    super(injector)
    this.user = this.users.getUser();

    this.rating = this.user.teacher.avg_rating;
    this.image = this.user.image;
    this.callApi();

   }

   async callApi(){

    let obj = {
      teacher_id: this.user.id
    }

    let res = await this.network.getReviews(obj);
    console.log(res);

    this.reviews = res.result;


   }



   back(){
    this.nav.pop()
   }
  ngOnInit() {
  }

}
