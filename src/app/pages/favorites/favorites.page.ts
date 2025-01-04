import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // start
  view = 'course';

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      // this.nav.pop('/tabs/student-dashboard/student-dashborad-courses');
 
    }
    if (view == 'notes'){
      // this.nav.push('/tabs/student-dashboard/student-dashboard-study-material');

    }
  }
  // end

}
