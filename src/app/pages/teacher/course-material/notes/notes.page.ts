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
  
  list$;
  
  constructor(injector: Injector, public globalStudyMaterialService: GlobalStudyMaterialService) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const res = await this.globalStudyMaterialService.getMyStudyMaterialFromApi(page, search);

    let pagination = {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };

    this.globalStudyMaterialService.setList(pagination.list, pagination.page, pagination.last_page, pagination.total)
  }

  ngOnInit() {
    // this.resetAndFetch();
    this.globalStudyMaterialService.getList().subscribe( (data) => {
      this.list$ = data;
    });
  }


  openDetails(item: any) {    
    this.nav.push('teacher-material-detail', {material_id: item.id})
  }

  onMaterialDeleted(item: any) {
    console.log(item);
    this.globalStudyMaterialService.removeItem(item);
    this.cdr.detectChanges()
  }
}
