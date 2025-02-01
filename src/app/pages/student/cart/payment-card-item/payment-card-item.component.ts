import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-card-item',
  templateUrl: './payment-card-item.component.html',
  styleUrls: ['./payment-card-item.component.scss'],
})
export class PaymentCardItemComponent  implements OnInit {

  formData: any = {
    name_on_card: null,
    password: null,
  };

  constructor() { }

  ngOnInit() {}

  result(value, key) {
    this.formData[key] = value;
  }

}
