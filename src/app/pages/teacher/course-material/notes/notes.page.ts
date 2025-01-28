import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ListPage } from 'src/app/base-page/list-page';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage extends ListPage implements OnInit {
  
  // user;
  // search = '';
  // page = 1;
  // last_page = -1;
  // list: any[] = [];
  // course;
  // isSearchBarShow = false;
  // status;

  // constructor(injector: Injector) {
  //   super(injector)
  // }

  // ngOnInit() {

  //   this.user = this.users.getUser();
  //   this.getMaterial('', 1)

  //   this.events.subscribe('initilize-the-list', (res) => {
  //     this.getMaterial('', 1)
  //   });

  // }

  // ionViewWillEnter() {
  //   // const params = this.nav.getQueryParams() as any
  //   this.getMaterial(this.search, 1)
  //   // }

  // }

  // back(){
  //   //this.nav.pop('/tabs/teacher-dashboard')
  //   this.nav.pop()
  // }

  // async getMaterial(search = '', page = 1) {
  //   return new Promise(async resolve => {

  //     let obj = {
  //       search: search,
  //       page: page
  //     }

  //     const res = await this.network.getMyMaterialList(obj, this.user.id) as any;
  //     console.log(res);
  //     const result = res.result;
  //     this.page = result.current_page;
  //     this.last_page = result.last_page;
  //     if (this.page == 1) {
  //       this.list = result["data"];
  //     } else {
  //       this.list = [...this.list, ...result["data"]]
  //     }

  //     resolve(true)
  //   })
  // }

  // onCourseDeleted(courseId: number) {
  //   this.getMaterial(this.search, 1)
  // }
  // courseActive() {
  //   // this.initialize()
  // }
  // courseInctive() {
  //   // this.initialize()

  // }

  // courseEdit() {

  //   this.getMaterial(this.search, 1)
  // }

  // openDetails(obj) {

  //   const params = {
  //     material_id: obj.id,
  //     backUrl: '/tabs/courses'
  //   }
  //   this.nav.push('/material-detail', params)

  // }

  // async doSearch($event) {
  //   await this.getMaterial(this.search, 1);
  // }

  // async handleRefresh(event) {

  //   await this.getMaterial(this.search, 1);
  //   setTimeout(() => {
  //     // Any calls to load data go here
  //     event.target.complete();
  //   }, 500);
  // }

  // async onIonInfinite(ev) {

  //   if (this.last_page > this.page) {
  //     await this.getMaterial(this.search, this.page + 1);
  //   }

  //   setTimeout(() => {
  //     (ev as InfiniteScrollCustomEvent).target.complete();
  //   }, 500);
  // }

  // parentback() {
  //   this.nav.pop('/tabs/teacher-dashboard')
  // }

  // ShowSearchBar(event) {
  //   this.isSearchBarShow = !this.isSearchBarShow;
  // }
  
  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const res = await this.globalStudyMaterialService.getMyStudyMaterialFromApi(page, search);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };
  }

  ngOnInit() {
    this.resetAndFetch();
  }


  openDetails(item: any) {    
    this.nav.push('teacher-material-detail', {material_id: item.id})
  }

  onMaterialDeleted(item: any) {
    //   this.getMaterial(this.search, 1)
    // }
  }
}
