import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-checkout-history-detail',
  templateUrl: './checkout-history-detail.page.html',
  styleUrls: ['./checkout-history-detail.page.scss'],
})
export class CheckoutHistoryDetailPage implements OnInit {

  title = 'Checkout History Detail';

  order: any = null;

  list: any[] = [];
  constructor(private nav: NavService, private network: NetworkService) { }

  async ngOnInit() {

    const params = this.nav.getQueryParams();
    console.log(params);  

    const res = await this.network.getStudentOrder(params)
    console.log(res);

    const d = res.result;
    if(d){
      this.order = d;
      this.list = d.order_items;
    }
    

  }

}
