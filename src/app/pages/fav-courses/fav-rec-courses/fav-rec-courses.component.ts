import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-fav-rec-courses',
  templateUrl: './fav-rec-courses.component.html',
  styleUrls: ['./fav-rec-courses.component.scss'],
})
export class FavRecCoursesComponent extends BasePage { // implements OnInit, ViewWillEnter

  // list: any[] = [];
  // page: number = 1;
  // last_page = -1;
  // search: string = '';
  // data: any;
  loading = false;

  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector);
    // this.initialize();
  }

  // ionViewWillEnter(): void {
  //   this.initialize();
  // }

  // ngOnInit() {

  // }

  async initialize() {
    // this.getCourses('', 1);
  }

  // getCourses(search = '', page = 1, liked = false) {

  //   return new Promise(async resolve => {

  //     let obj = {
  //       search: search,
  //       page: page,
  //       liked: true
  //     }

  //     const res = await this.network.getAllCourses(obj) as any;
  //     const data = res.result;
  //     this.page = data.current_page;
  //     this.list = data.data;
  //     this.last_page = data.last_page;

  //     this.events.publish("fav-list-length", { data })
  //     resolve(true);

  //   });

  // }

  // removeFormFav(id) {

  //   this.list = this.list.filter(list => list.id !== id);
  // }



  async onIonInfinite(ev) {
    this.loading = true;
    if (this.globalCourses.page <= this.globalCourses.fav_last_page) {
      const np = this.globalCourses.fav_page + 1;
      await this.globalCourses.getFavToApi('', np)
    }
    this.loading = false;
  }
}

