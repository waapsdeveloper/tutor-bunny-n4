import { Component, OnInit } from '@angular/core';
import { NetworkInterfaceBase } from 'os';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-credits',
  templateUrl: './teacher-credits.page.html',
  styleUrls: ['./teacher-credits.page.scss'],
})
export class TeacherCreditsPage implements OnInit {
user ;
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
  chips = ['Pending', '2024', '2023', '2022'];

  selectedChip = 0; // Default selected chip (e.g., 'Pending')

  selectChip(index: number) {
    this.selectedChip = index; // Update the selected chip index
  }

  constructor(private nav: NavService,private network:NetworkService) { }

  goback(){
    this.nav.pop('/tabs/teacher-dashboard');
  }

  buyCredits(){
    this.nav.push('/teacher-credits-buy');
  }


 async ngOnInit(){
  let user = localStorage.getItem('user');
  this.user = JSON.parse(user);
  console.log(this.user);
   let res = await this.network.creditHistory(this.user?.id);
   console.log(res);
   this.item = res
  }





}
