import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  showTabs = true;
  constructor(private events: EventsService) {
    this.initialize()
    
  }

  ngOnInit() {
    this.events.subscribe('page-scroll-event', this.pageScrollCondition.bind(this), false)
  }

  pageScrollCondition(data){

    let direction = data.direction;    
    if(direction == 'up'){
      this.showTabs = true;
    }

    if(direction == 'down'){
      this.showTabs = false;
    }
  }

  initialize(){
    // let user = this.users.getUser();
  }


  
}
