import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent  implements OnInit {

  @Input() maxRating: number = 5;
  @Input() currentRating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {}

  get stars(): number[] {
    return Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  rate(index: number): void {
    this.currentRating = index;
    this.ratingChange.emit(this.currentRating);
  }

}
