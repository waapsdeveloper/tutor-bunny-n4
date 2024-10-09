import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  pageTitle = 'My Requests'

  constructor() { }

  ngOnInit() {
  }

  // /get-requested/course/trials/{student_id}

  getTotalNumver(event){
    console.log(event);
    this.pageTitle = `My Requests (${event})`;
  }

}
