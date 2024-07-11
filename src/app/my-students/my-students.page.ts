import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.page.html',
  styleUrls: ['./my-students.page.scss'],
})
export class MyStudentsPage extends BasePage implements OnInit {
  
  user;
  list: any[] = [];

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    this.user = this.users.getUser();
    const res = await this.network.geTrailRequests(this.user.id);
    console.log(res);
    this.list = res.trials;

  }
  removeFromList(id){
    this.initialize();
  }
}
