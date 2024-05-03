import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trial-box',
  templateUrl: './trial-box.component.html',
  styleUrls: ['./trial-box.component.scss'],
})
export class TrialBoxComponent  implements OnInit {

  list = [
    {
      nbl: 'Accept',
      colorClass: '',
      img: 'assets/icon/check-circle.svg',

    },
    {
      nbl: 'Reject',
      colorClass: '',
      img: 'assets/icon/reject-circle.svg'
    },
    {
      nbl: 'Block',
      colorClass: '',
      img: 'assets/icon/block-circle.svg'
    },
  ]
  constructor() { }

  ngOnInit() {}

}
