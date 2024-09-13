import { Component, Injector, Input, input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.scss'],
})
export class RatingReviewComponent extends BasePage implements OnInit {

  @Input() rating

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  goToReviews(){
    this.nav.push('/reviews-by-student')
  }

}
