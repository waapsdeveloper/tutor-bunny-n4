import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-bb-box',
  templateUrl: './option-bb-box.component.html',
  styleUrls: ['./option-bb-box.component.scss'],
})
export class OptionBbBoxComponent  implements OnInit {

  list = [
    {
      nbl: 'Schedule',
      colorClass: '',
      img: 'assets/icon/calendar.svg',

    },
    {
      nbl: 'Course',
      colorClass: '',
      img: 'assets/icon/cradd.svg'
    },
    {
      nbl: 'Buy Credit',
      colorClass: '',
      img: 'assets/icon/buyc.svg'
    },
  ]
  constructor() { }

  ngOnInit() {}

}
