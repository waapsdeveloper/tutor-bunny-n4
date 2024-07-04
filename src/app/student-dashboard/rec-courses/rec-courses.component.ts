import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-rec-courses',
  templateUrl: './rec-courses.component.html',
  styleUrls: ['./rec-courses.component.scss'],
})
export class RecCoursesComponent extends BasePage implements OnInit {

  list: any[] = [];
  page: number = 1;
  last_page = -1;
  search: string = '';
  data: any;
  loading = false;

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {
    this.events.subscribe("show-list-of-fav-courses", (data) => {
      console.log("show liked", data);
      this.getCourses('', 1, data.liked);
    })
  }

  async initialize() {
    this.getCourses('', 1);
  }

  getCourses(search = '', page = 1, liked = false) {

    return new Promise(async resolve => {

      let obj = {
        search: search,
        page: page,
        liked: liked
      }

      const res = await this.network.getAllCourses(obj) as any;
      console.log(res)
      const data = res.result;
      this.page = data.current_page;
      this.list = data.data;
      this.last_page = data.last_page;


      resolve(true);

    });

  }

  async onIonInfinite(ev) {
    this.loading = true;
    if (this.page <= this.last_page) {
      const np = this.page + 1;
      await this.getCourses(this.search, np)
    }
    this.loading = false;
  }
}
