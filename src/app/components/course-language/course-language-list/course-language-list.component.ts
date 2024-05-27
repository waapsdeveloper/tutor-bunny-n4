import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-language-list',
  templateUrl: './course-language-list.component.html',
  styleUrls: ['./course-language-list.component.scss'],
})
export class CourseLanguageListComponent extends BasePage implements OnInit {
  list = [];
  lang;
  search: "";
  param;
  page = 1;

  private _preSelectedLanguages: any[] = [];
  @Input('preSelectedLanguages')
  public get preSelectedLanguages() {
    return this._preSelectedLanguages;
  };

  public set preSelectedLanguages(value: any[]) {
    this._preSelectedLanguages = value;

  }





  searchTerm: string = '';
  selectedContactId: any = null;
  constructor(injector: Injector) {
    super(injector)
  }
  ngOnInit() {
    this.initialize()
  }

  async initialize() {


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

      // // set selected languages
      this.list = this.list.map((item) => {
        const fi = this.preSelectedLanguages.find(x => x.id == item.id);
        if (fi) {
          item.checked = true;
        }
        return item;
      });

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
