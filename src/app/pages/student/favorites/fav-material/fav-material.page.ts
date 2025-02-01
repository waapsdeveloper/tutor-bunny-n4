import { Component, Injector, OnInit } from '@angular/core';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalFavMaterialService } from 'src/app/services/student/global-fav-material.service';

@Component({
  selector: 'app-fav-material',
  templateUrl: './fav-material.page.html',
  styleUrls: ['./fav-material.page.scss'],
})
export class FavMaterialPage extends ListPage implements OnInit {
  
  constructor( injector: Injector, private globalFavMaterialService: GlobalFavMaterialService ) {
    super(injector);    
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const data = await this.globalFavMaterialService.getListPromise();
    const materialids = (data as any[]).map((item) => item.study_material_id);

    let obj = {
      ids: materialids,
      page: page,
    };

    let res = await this.network.favMaterialByIds(obj);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total,
    };
  }

  
  ngOnInit() {
    this.resetAndFetch();
  }

  openDetails(item: any) {
    this.nav.push('/student-material-detail', {material_id: item.id})
  }

//   async initialize() {
//     this.loadResolvers();
//     this.user = this.dataR.user;

//     const data = await this.favCourseSqService.list(this.user.id);
//     this.courseids = data.map((item) => item.course_id);

//     this.loading = true;
//     await this.callApi(this.page)
//     this.loading = false;
//   }

//   callApi(page) {
//     return new Promise(async (resolve) => {
//       let obj = {
//         ids: this.courseids,
//         page: page
//       };

//       let res = await this.network.FavCourseByIds(obj);

//       const result = res.result;
//       // this.favorites = data.data;
//       this.page = result.current_page;
//       this.last_page = result.last_page;
//       if (this.page == 1) {
//         this.list = result['data'];
//       } else {
//         this.list = [...this.list, ...result['data']];
//       }

//       resolve(true);
//     });

//     // this.list = res.trials;
//   }

//   async onIonInfinite(event) {
//     if (this.last_page > this.page) {
//       await this.callApi(this.page + 1)
//     }

//     setTimeout(() => {
//       (event as InfiniteScrollCustomEvent).target.complete();
//     }, 500);
//   }

//   shouldHandleBackToPrevScreen() {
//     this.nav.pop();
//   }

//   // start
//   toogleView(view) {
//     this.view = view;
//     if (view == 'course') {
//       // this.nav.pop('/tabs/student-dashboard/student-dashborad-courses');
//       // this.nav.pop('');
//     }
//     if (view == 'notes'){
//       // this.nav.push('/tabs/student-dashboard/student-dashboard-study-material');
//       // this.nav.push('');
//     }
//   }
//   // end
// }
}
