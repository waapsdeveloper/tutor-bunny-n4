import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private nav: NavService) {}

  ngOnInit() {
    setTimeout(() => {
      this.nav.push('/role-base');
    }, 3000);
  }
}
