import { Component, OnInit } from '@angular/core';
import { GlobalFavCoursesService } from 'src/app/services/global-fav-courses.service';
import { GlobalFavMaterialService } from 'src/app/services/global-fav-material.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-header-fav-button',
  templateUrl: './header-fav-button.component.html',
  styleUrls: ['./header-fav-button.component.scss'],
})
export class HeaderFavButtonComponent implements OnInit {

  courseFavCount$;
  materialFavCount$;


  constructor(private nav: NavService, private globalFavCoursesService: GlobalFavCoursesService, private globalFavMaterialService: GlobalFavMaterialService) { }

  ngOnInit() {
    this.globalFavCoursesService.getCount().subscribe( data => {
      this.courseFavCount$ = data;
      console.log("fav-course", data);
    });

    this.globalFavMaterialService.getCount().subscribe( data => {
      this.materialFavCount$ = data;
      console.log("fav-material", data);
    })
  }

  async showFavCourse() {
    this.nav.push('/favorites');
  }

}
