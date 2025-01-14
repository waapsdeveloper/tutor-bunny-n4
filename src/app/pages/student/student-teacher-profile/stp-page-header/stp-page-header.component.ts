import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stp-page-header',
  templateUrl: './stp-page-header.component.html',
  styleUrls: ['./stp-page-header.component.scss'],
})
export class StpPageHeaderComponent  implements OnInit {

  user = {
    image: ''
  };
  roleId;
  displayName;
  status;
  verified_on;
  rating;
  total_rating;

  constructor() { }

  ngOnInit() {}

  openEditProfile() {
    //
  }

  back(){

  }

}
