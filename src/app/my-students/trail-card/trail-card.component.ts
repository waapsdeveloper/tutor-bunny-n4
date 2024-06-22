import { Component, Injector, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
@Component({
  selector: 'app-trail-card',
  templateUrl: './trail-card.component.html',
  styleUrls: ['./trail-card.component.scss'],
})
export class TrailCardComponent extends BasePage implements OnInit {
  @Input() item: any;
  flag;
  date;
  time;

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.flag = this.getFlag()
    let currentDate = this.item.created_at;
    this.time = moment(currentDate).format('HH:mm a');

  }
  getFlag() {
    if (this.item && this.item.student && this.item.student.flag) {
      const flag = this.item.student.flag;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  async trailStatus(key) {
    let obj = {
      status: key
    };

    let trialId = this.item.id;

    let res = await this.network.changeTrailStuts(obj, trialId);
    console.log(res);
    
  }

}
