import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
})
export class RatingListComponent {

  
  @Input() list: any[] = [];  
  @Output() clickOpen = new EventEmitter<any>()
  
  constructor() {

  }  

}
