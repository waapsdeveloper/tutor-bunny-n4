import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout-history',
  templateUrl: './checkout-history.page.html',
  styleUrls: ['./checkout-history.page.scss'],
})
export class CheckoutHistoryPage implements OnInit {

  chips = ['Pending', '2024', '2023', '2022'];
  
  selectedChip = 0; // Default selected chip (e.g., 'Pending')

  

  title = 'Checkout History';
  list: any[] = [];

  constructor(private network: NetworkService, private users: UsersService ) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize(){
    const res = await this.network.getStudentOrders()
    console.log(res);

    if(res.result){

      let d = res.result.data;
      this.list = d;

    }
  }

  selectChip(index: number) {
    this.selectedChip = index; // Update the selected chip index
  }

}
