import { Component, OnInit } from '@angular/core';
import { GlobalFavCoursesService } from 'src/app/services/global-fav-courses.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-header-fav-button',
  templateUrl: './header-fav-button.component.html',
  styleUrls: ['./header-fav-button.component.scss'],
})
export class HeaderFavButtonComponent implements OnInit {

  courseFavCount$;


  constructor(private nav: NavService, private globalFavCoursesService: GlobalFavCoursesService,) { }

  ngOnInit() {
    this.globalFavCoursesService.getCount().subscribe( data => {
      this.courseFavCount$ = data;
    })
  }

  async showFavCourse() {
    this.nav.push('/favorites');
  }

}
