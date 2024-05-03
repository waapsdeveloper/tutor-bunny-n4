import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { resolve } from 'path';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent implements OnInit {
  list = [];
  sub
  search: "";
  page = 1;
  selectedContactId: any = null;
  constructor(private modals: ModalService, private network: NetworkService) {

  }
  ngOnInit() {
    this.initialize()
  }
  async initialize() {
    this.search = "";
    this.page = 1;
    this.callApi();
  }

  callApi() {
    return new Promise( async resolve => {

      let obj = {
        search: this.search,
        page: this.page
      }

      this.sub = await this.network.getSubject(obj) as any[];
      console.log(this.sub);
      this.page = this.sub.current_page;

      if (this.page == 1) {
        this.list = this.sub["data"];
      } else {
        this.list = [...this.list, ...this.sub["data"]]
      }

      resolve(true);

    })


  }

  async loadMore($event) {
    this.page = this.sub.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }
  selection(item: any) {
    this.modals.dismiss(item);
  }
  isListItemSelected() {
    return this.list.filter(x => x.checked == true).length > 0;
  }
  selectedsubject() {
    let list = this.list.filter(x => x.checked == true);
    console.log(list);
    this.modals.dismiss(list);
  }
}
