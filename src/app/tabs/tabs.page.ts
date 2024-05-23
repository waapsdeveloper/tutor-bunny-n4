import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  showTabs = true;
  user;
  constructor(private events: EventsService, private users: UsersService) {
    this.initialize()
  }

  ionViewWillEnter(){
    this.user = this.users.getUser()
  }

  ngOnInit() {
    this.events.subscribe('page-scroll-event-end', this.pageScrollConditionEnd.bind(this))
  }

  pageScrollConditionEnd(data){
    const efr = localStorage.getItem('efr');
    if(efr){
      this.showTabs = efr == 'show'// this.efr;
    }

  }

  initialize(){
    // let user = this.users.getUser();
  }

  returnDashboardLink(){
    if(!this.user){
      return '';
    }

    if(!this.user.role_id){
      return '';
    }

    const roleId = parseInt(this.user.role_id);

    if(roleId == 2){
      return 'student-dashboard'
    }

    if(roleId == 3){
      return 'teacher-dashboard'
    }

    return ''







  }



}
