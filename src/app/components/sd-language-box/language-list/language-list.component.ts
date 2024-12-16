import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { LanguagesSqService } from 'src/app/services/sqlite/languages-sq.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent extends BasePage {

  list = [];
  search: "";
  offset = 0;
  limit = 30;

  selection: any[] = [];

  @Input() user: any = null;

  private _preSelectedLanguages: any[] = [];
  @Input('preSelectedLanguages')
  public get preSelectedLanguages() {
    return this._preSelectedLanguages;
  };

  public set preSelectedLanguages(value: any[]) {
    this._preSelectedLanguages = value;
    this.selection = Object.assign([], value);
    this.initialize()
  }



  constructor(injector: Injector, private languagesSqService: LanguagesSqService) {
    super(injector)
  }

  // ngOnInit() {

  // }

  async initialize() {
    this.user = this.users.getUser()
    this.search = "";
    this.offset = 0;
    this.callApi();
  }


  isListItemSelected() {
    return this.list.filter(x => x.checked == true).length > 0;
  }


  async selectedLanguage() {
    console.log(this.selection)

    this.modals.dismiss({ 'selection': this.selection });
  }


  async loadMore($event) {
    this.offset = this.list.length;
    await this.callApi();
    $event.target.complete();
  }


  async callApi(): Promise<any> {

    const res = await this.languagesSqService.list(this.search, this.offset, this.limit)
    console.log(res);

    if (this.offset == 0) {
      this.list = res;
    } else {
      this.list = [...this.list, ...res];
    }

    this.list = this.list.map((item) => {
      const fi = this.selection.find(x => x.id == item.id);
      if (fi) {
        item.checked = true;
      }
      return item;
    });

    return true



    // return new Promise(async resolve => {
    //   let obj = {
    //     search: this.search,
    //     page: this.page
    //   }

    //   let listw = this.list.filter(x => x.checked == true);

    //   this.lang = await this.network.getLanguage(obj) as any[];
    //   this.page = this.lang.current_page;

    //   if (this.page == 1) {
    //     // Reset list on new search
    //     this.list = [];
    //   }

    //   // Collect the current search results
    //   let newList = this.lang["data"];

    //   // Merge new list with previously selected items
    //   this.list = [...new Set([...this.list, ...newList, ...listw])];

    //   // Update the list to check pre-selected items
    //   this.list = this.list.map((item) => {
    //     const fi = this.preSelectedLanguages.find(x => x.id == item.id);
    //     if (fi) {
    //       item.checked = true;
    //     }
    //     return item;
    //   });

    //   // Ensure all pre-selected items are still in the list
    //   this.preSelectedLanguages.forEach(selectedItem => {

    //     console.log("repeat", selectedItem)

    //     let findIndex = this.list.findIndex(item => item.name == selectedItem.name)
    //     if(findIndex == -1){
    //       this.list = [...new Set([...this.list, ...[selectedItem]])];
    //     }
    //     // if (!this.list.some(item => item.name === selectedItem.name)) {
    //     //   this.list.push(selectedItem);
    //     // }
    //   });

    //   resolve(true);
    // })
  }

  addtoselection(item) {
    console.log(item);

    if (item.checked == true) {
      const fi = this.selection.findIndex(x => x.id == item.id)
      if (fi == -1) {
        this.selection.push(item)
      }
    }

    if (item.checked == false) {
      const fi = this.selection.findIndex(x => x.id == item.id)
      if (fi > -1) {
        this.selection.splice(fi, 1)
      }
    }
  }





  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.offset = 0;
    this.callApi();
    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }


  capitalizeFirst(string) {
    return this.utility.capitalizeEachFirst(string)
  }

  back() {
    this.modals.dismiss({ 'selection': this.preSelectedLanguages });
  }


}
