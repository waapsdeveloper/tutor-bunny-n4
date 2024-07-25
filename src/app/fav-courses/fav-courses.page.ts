import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseService } from '../services/firebase.service';
import { MyFavoritesService } from '../services/my-favorites.service';

@Component({
  selector: 'app-fav-courses',
  templateUrl: './fav-courses.page.html',
  styleUrls: ['./fav-courses.page.scss'],
})
export class FavCoursesPage extends BasePage { //  implements OnInit


  constructor(injector: Injector, public authService: AuthenticationService, public favService: MyFavoritesService) {
    super(injector)
    this.initialize()
  }

  // ngOnInit() {

  // }

  // ionViewWillEnter() {
  //   this.initialize()
  // }

  async initialize() {
    // this.events.subscribe("fav-list-length", (data) => {
    //   if (data.data) {
    //     const d = data.data;
    //     let cp = d.current_page;
    //     let ls = d.data;
    //     this.listCount = cp == 1 && ls.length == 0 ? 0 : -1;
    //   }
    // })
  }

  shouldHandleBackToPrevScreen() {
    // this.modals.dismiss();
    this.nav.pop()
  }

}


