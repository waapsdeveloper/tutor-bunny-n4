import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent extends BasePage implements OnInit {
  list = [];
  lang;
  search: "";
  param;
  page = 1;
  @Input() obj;
  searchTerm: string = '';
  selectedContactId: any = null;
  constructor(injector: Injector) {
    super(injector)
  }
  ngOnInit() {
    this.initialize()
  }

  async initialize() {
    console.log(this.obj);

    this.search = "";
    this.page = 1;
    this.callApi();
  }
  selection(item: any) {
    this.modals.dismiss(item);
  }
  isListItemSelected() {
    return this.list.filter(x => x.checked == true).length > 0;
  }
  selectedLanguage() {
    let list = this.list.filter(x => x.checked == true);
    this.modals.dismiss(list);
  }
  async loadMore($event) {
    this.page = this.lang.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }
  callApi() {
    return new Promise(async resolve => {
      let obj = {
        search: this.search,
        page: this.page
      }
      this.lang = await this.network.getLanguage(obj) as any[];
      this.page = this.lang.current_page;
      if (this.page == 1) {
        this.list = this.lang["data"];
      } else {
        this.list = [...this.list, ...this.lang["data"]]
      }
      resolve(true);
    })
  }


  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.page = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  capitalizeFirst(string) {
    return this.utility.capitalizeEachFirst(string)
  }


}
