import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent implements OnInit {

  @Input() item;
  subjects;

  constructor() { }

  ngOnInit() { 
    
  }

  getFlag() {
    if (this.item && this.item.teacher && this.item.teacher.country) {
      const flag = this.item.teacher.country.iso2;
      return flag.toLowerCase();
    }
    else {
      return ""
    }
  }

}
