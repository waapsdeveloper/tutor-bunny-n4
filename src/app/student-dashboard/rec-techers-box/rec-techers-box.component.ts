import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-rec-techers-box',
  templateUrl: './rec-techers-box.component.html',
  styleUrls: ['./rec-techers-box.component.scss'],
})
export class RecTechersBoxComponent extends BasePage implements OnInit {
  list;
  teachers;

  constructor(injector: Injector) {
    super(injector)

    this.callApi();
  }

  ngOnInit() { }

  async callApi() {
    const res = await this.network.getAllTeachers() as any [];
    console.log(res);
    
    this.list = res;
    
  }

}
