import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-purchase-history-detail',
  templateUrl: './purchase-history-detail.page.html',
  styleUrls: ['./purchase-history-detail.page.scss'],
})
export class PurchaseHistoryDetailPage implements OnInit {

  title = 'Purchase History Detail';

  order: any = null;

  list: any[] = [];
  constructor(private nav: NavService, private network: NetworkService) { }

  async ngOnInit() {

    const params = this.nav.getQueryParams();
    console.log(params);  

    const res = await this.network.getTeacherOrder(params)
    console.log(res);

    const d = res.result;
    if(d){
      this.order = d;
      this.list = d.order_items;
    }
    

  }

}
