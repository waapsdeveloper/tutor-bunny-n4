import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent implements OnInit {
  @Input() rating: number;
  @Input() maxRating: number = 5;

  constructor() {}

  ngOnInit() {}

  get stars(): number[] {
    return Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  isStarFilled(starNumber: number): boolean {
    return starNumber <= this.rating;
  }
}
