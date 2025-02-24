import { Component, EventEmitter, Input, OnInit, Output , HostListener,} from '@angular/core';

@Component({
  selector: 'app-rating-start',
  templateUrl: './rating-start.component.html',
  styleUrls: ['./rating-start.component.scss'],
})
export class RatingStartComponent  implements OnInit {

  @Input() maxRating: number = 5;
  @Input() currentRating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  hostScreensize = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width;
  }


  ngOnInit()
  {
    console.log();
  }

  get stars(): number[] {
    return Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  rate(index: number): void {
    this.currentRating = index;
    this.ratingChange.emit(this.currentRating);
  }


}
