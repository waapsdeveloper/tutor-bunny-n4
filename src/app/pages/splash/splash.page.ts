import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitializeAppService } from 'src/app/services/sqlite/initialize.app.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  loading = false;
  constructor(
    private usersService: UsersService,
    private iap: InitializeAppService,
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.initialize();
  }

  async initialize() {

    this.loading = true;

    await this.iap.initializeGenericTables();
    let res = await this.usersService.getLoginUserFromApi();

    if (res) {
      this.router.navigate(['/pre-splash']);
    } else {
      this.router.navigate(['/role-base']); // Redirect to role-base if no user is logged in
    }

    this.loading = false;
  }

  // Helper function for redirection based on user role

}
