import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teacher-info-card',
  templateUrl: './teacher-info-card.component.html',
  styleUrls: ['./teacher-info-card.component.scss'],
})
export class TeacherInfoCardComponent {

  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateDetails(value);
  }

  get data(): any {
    return this._data;
  }

  image = 'assets/profileimg.png';
  name; 
  flag = ''
  country = '';
  text = '';
  teacher_id = null;
  email = ''

  constructor(private nav: NavService, private users: UsersService) {}

  updateDetails(value: any) {
    console.log(value)
    if (value) {
      this.email = value.email,
      this.teacher_id = value.teacher_id
      this.image = value.image;
      this.name = value.name;
      this.flag = value.flag;
      this.country = value.country;
      this.text = value.text;


    }
  }

  openTeacherDetail(){
    
    const user = this.users.getUser();
    if(user && user.role_id == 2){
      this.nav.push('/student-teacher-profile', {
        teacher_id: this.teacher_id
      });
    }else{
      this.nav.push('/teacher-profile', { email: this.email });
    }
  }



}
