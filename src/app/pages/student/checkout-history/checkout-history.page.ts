import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout-history',
  templateUrl: './checkout-history.page.html',
  styleUrls: ['./checkout-history.page.scss'],
})
export class CheckoutHistoryPage implements OnInit {

  title = 'Checkout History';

  list: any[] = [];

  constructor(private network: NetworkService, private users: UsersService ) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize(){
    const user = await this.users.getUser();
    const res = await this.network.materialCheckoutHistory(user.id)
    console.log(res);
  }

}
