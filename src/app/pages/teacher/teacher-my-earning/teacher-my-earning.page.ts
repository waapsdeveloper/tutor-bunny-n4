import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-teacher-my-earning',
  templateUrl: './teacher-my-earning.page.html',
  styleUrls: ['./teacher-my-earning.page.scss'],
})
export class TeacherMyEarningPage {  

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
  
}
