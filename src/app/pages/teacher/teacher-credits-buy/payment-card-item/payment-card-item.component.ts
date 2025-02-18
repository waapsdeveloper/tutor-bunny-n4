import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

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

  constructor(private nav: NavService) { }

  ngOnInit() {}

  result(value, key) {
    this.formData[key] = value;
  }

  goToPurchaseHistory(){
    this.nav.push('teacher-credits');
  }

}
