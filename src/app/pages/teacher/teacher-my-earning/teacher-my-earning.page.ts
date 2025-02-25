import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-my-earning',
  templateUrl: './teacher-my-earning.page.html',
  styleUrls: ['./teacher-my-earning.page.scss'],
})
export class TeacherMyEarningPage {
  wallet;
  currency;
  history;
  id;
 constructor(private network : NetworkService){
  this.initialize();
 }

  async initialize(){
    let res = await this.network.getTeacherWallet();
    this.id = res?.result.user?.id;
    let hist = await this.network.earningHistory(this.id);
    console.log("history of the " , hist.transaction_history);
    this.wallet = res.result.amount
    this.history = hist.transaction_history
    console.log(hist)
    this.currency = res.result.currency_symbol;
  }

  months: any[] = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  chips = [ '2024', '2023', '2022'];

  selectedChip = 0; // Default selected chip (e.g., 'Pending')

  selectChip(index: number) {
    this.selectedChip = index; // Update the selected chip index
  }

}
