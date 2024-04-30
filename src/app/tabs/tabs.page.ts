import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private nav: NavService) {}

  ngOnInit() {
    this.checkProfileCompleted();
  }

  checkProfileCompleted() {
    // for teacher
    this.nav.push('/teacher-profile');
  }
}
