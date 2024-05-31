import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mode-of-teaching',
  templateUrl: './mode-of-teaching.component.html',
  styleUrls: ['./mode-of-teaching.component.scss'],
})
export class ModeOfTeachingComponent implements OnInit {

  teachingMode = {
    mode: 'online',
    capacity: '1-1'
  }

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() { }
  toggleMode(mode: string) {
    this.teachingMode.mode = mode;
    console.log(this.teachingMode);
    this.onChange.emit(this.teachingMode);


  }
  toggleCapacity(capacity: string) {
    this.teachingMode.capacity = capacity;
    console.log(this.teachingMode);
    this.onChange.emit(this.teachingMode);

  }
}
