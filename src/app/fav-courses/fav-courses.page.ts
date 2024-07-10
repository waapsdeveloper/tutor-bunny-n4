import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss'],
})
export class FavCoursesPage extends BasePage implements OnInit {
  backUrl

  constructor(injector: Injector, public authService: AuthenticationService, private fcm: FirebaseService) {
    super(injector)
    this.initialize()
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.initialize()
  }

  async initialize() {

  }

  shouldHandleBackToPrevScreen() {
    this.modals.dismiss();
  }
}


