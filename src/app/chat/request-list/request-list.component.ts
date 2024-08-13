import { Component, Injector, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent extends BasePage implements OnInit {
  flag;
  date
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  };

  public set item(value: any) {
    this._item = value;
    this.flag = this.getFlag();
    const date = this.item.updated_at;

    this.date = moment(date).format('L');
  }
  constructor(injector:Injector) { 
   super(injector)
  }

  ngOnInit() {}

  getFlag() {
    console.log(this.item);
    
    if (this.item && this.item.user.student && this.item.user.student.country) {
      const flag = this.item.user.student.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else {
      return "";
    }
  }

  async updaeStatus(value){
    console.log(value);
    let obj ={
      request_status: value
    }

    let res = await this.network.updateMessageReaquest(obj, this.item.chat_room_id);
    console.log(res);
    
    
  }
}
