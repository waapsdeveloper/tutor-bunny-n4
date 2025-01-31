import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  constructor(private nav: NavService) { }

  // start
  view = 'course';

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.nav.push('favorites/fav-courses');
    }
    if (view == 'notes'){
      this.nav.push('favorites/fav-material');
    }
  }
  
}
