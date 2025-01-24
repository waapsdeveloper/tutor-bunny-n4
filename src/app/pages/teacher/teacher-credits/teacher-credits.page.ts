import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-teacher-credits',
  templateUrl: './teacher-credits.page.html',
  styleUrls: ['./teacher-credits.page.scss'],
})
export class TeacherCreditsPage{

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
  
  constructor(private nav: NavService) { }

  goback(){
    this.nav.pop('/tabs/teacher-dashboard');
  }

  buyCredits(){
    this.nav.push('/teacher-credits-buy');
  }
}
