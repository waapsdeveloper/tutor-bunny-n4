import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-material-language-list',
  templateUrl: './material-language-list.component.html',
  styleUrls: ['./material-language-list.component.scss'],
})
export class MaterialLanguageListComponent extends BasePage implements OnInit {
  list = [];
  selectedItemId = 0;
  lang;
  search: '';
  param;
  page = 1;
  private _preSelectedLanguages: any[] = [];

  @Input('preSelectedLanguages')
  public get preSelectedLanguages() {
    return this._preSelectedLanguages;
  }
  public set preSelectedLanguages(value: any[]) {
    this._preSelectedLanguages = value;
  }

  searchTerm: string = '';
  selectedContactId: any = null;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.search = '';
    this.page = 1;
    this.callApi();
  }

  isListItemSelected() {
    return this.list.filter((x) => x.checked == true).length > 0;
  }

  selectedLanguage() {
    let item = this.list.find((x) => x.id === this.selectedItemId);

    if (!item) {
      this.modals.dismiss();
      return;
    }

    this.modals.dismiss({
      item: item,
    });
  }

  async loadMore($event) {
    if (this.lang.current_page == this.lang.last_page) {
      $event.target.disabled = true;
      return;
    }

    this.page = this.lang.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }
  callApi() {
    return new Promise(async (resolve) => {
      let obj = {
        search: this.search,
        page: this.page,
      };
      this.lang = (await this.network.getLanguage(obj)) as any[];
      this.page = this.lang.current_page;
      if (this.page == 1) {
        this.list = this.lang['data'];
      } else {
        this.list = [...this.list, ...this.lang['data']];
      }

      // Create a Set of preSelectedLanguage IDs for faster lookups

      if(this.preSelectedLanguages){
        const preSelectedIds = new Set(
          this.preSelectedLanguages.map((lang) => lang.id)
        );

        this.list = this.list.map((item) => {
          if (preSelectedIds.has(item.id)) {
            item.checked = true;
            this.selectedItemId = item.id;
          }
          return item;
        });

      }
      

      

      resolve(true);
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.page = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  capitalizeFirst(string) {
    return this.utility.capitalizeEachFirst(string);
  }
  selection(item) {
    this.modals.dismiss(item);
  }
  back() {
    this.modals.dismiss();
  }
}
