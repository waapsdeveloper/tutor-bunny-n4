import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-order-done-card-item',
  templateUrl: './order-done-card-item.component.html',
  styleUrls: ['./order-done-card-item.component.scss'],
})
export class OrderDoneCardItemComponent  implements OnInit {


  order_number = '';

  private _data: any;

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
    this.updateData(value);
  }

  constructor(private events: EventsService) { 

    this.events.subscribe("event-order-number", (res) => {
      this.updateData.bind(res);
    });
  }

  ngOnInit() {}



  async updateData(value: any){
    console.log(value)
    this.order_number = value.order_number;
  }



}
