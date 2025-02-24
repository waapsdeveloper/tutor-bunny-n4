import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { NetworkInterfaceBase } from 'os';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-credits',
  templateUrl: './teacher-credits.page.html',
  styleUrls: ['./teacher-credits.page.scss'],
})
export class TeacherCreditsPage implements OnInit, ViewWillEnter {
  perCreditAmount = 0;
  user;
  item;
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
  chips = ['2024', '2023', '2022'];

  selectedChip = 0; // Default selected chip (e.g., 'Pending')
 
  selectChip(index: number) {
    this.selectedChip = index; // Update the selected chip index
  }

  constructor(private nav: NavService, private network: NetworkService) {}

  goback() {
    this.nav.pop('/tabs/teacher-dashboard');
  }

  buyCredits() {
    this.nav.push('/teacher-credits-buy');
  }

  async ngOnInit() {
    console.log("err")
  }


  calculatePerCreditAmount(record: any): number {
    if (record?.coins && record?.total) {
      return parseFloat(record.total) / record.coins;
    }
    return 0; // Return 0 if data is missing
  }
  

  async ionViewWillEnter() {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
    console.log(this.user);
    let res = await this.network.creditHistory(this.user?.id);
    console.log(res);
    this.item = res;
  
  }
}
