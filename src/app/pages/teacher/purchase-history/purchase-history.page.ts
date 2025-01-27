import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit {

  chips = ['Pending', '2024', '2023', '2022'];
  
  selectedChip = 0; // Default selected chip (e.g., 'Pending')

  

  title = 'Checkout History';
  list: any[] = [];

  constructor(private network: NetworkService, private nav: NavService) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize(){
    const res = await this.network.getTeacherPurchases()
    console.log(res);

    if(res.result){

      let d = res.result.data;
      this.list = d;

    }
  }

  selectChip(index: number) {
    this.selectedChip = index; // Update the selected chip index
  }

  openDetails(checkout) {
    this.nav.push('checkout-history-detail', { id: checkout.id, order_number: checkout.order_number });
  }
}