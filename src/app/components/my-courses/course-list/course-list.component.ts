import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  
  
  @Input() list: any[] = [];  
  @Output() clickOpen = new EventEmitter<any>()
  
  constructor() {

  }  

  // oepnDeatils(item) {

  //   let role = localStorage.getItem('role');

  //   // return
  //   if(role =='2'){
  //     const params = {
  //       id: item.id,
  //     }
  //     this.nav.push('/student-course-detail', params)
  //   }else{

  //     const params = {
  //       id: item.id,
  //     }
  //     this.nav.push('/course-detail', params)
  //   }

  // }

}
