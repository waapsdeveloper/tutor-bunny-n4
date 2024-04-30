import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-role-base',
  templateUrl: './role-base.page.html',
  styleUrls: ['./role-base.page.scss'],
})
export class RoleBasePage implements OnInit {
  images = [];
  constructor(private nav: NavService) {}

  ngOnInit() {}

  setCurrentRole(key) {
    localStorage.setItem('role', key);
    this.nav.push('/home');
  }
}
