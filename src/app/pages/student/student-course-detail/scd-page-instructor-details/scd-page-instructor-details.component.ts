import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-instructor-details',
  templateUrl: './scd-page-instructor-details.component.html',
  styleUrls: ['./scd-page-instructor-details.component.scss'],
})
export class ScdPageInstructorDetailsComponent  implements OnInit {
displayName;
techerImg;
flag;
country;
techerTitle;

  constructor() { }

  ngOnInit() {}

  goToTeacher() {
  }
  
}
