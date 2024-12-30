import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { NetworkService } from 'src/app/services/network.service';
import { CreateMaterialService } from '../../create-material.service';

@Component({
  selector: 'app-material-search-keyword',
  templateUrl: './material-search-keyword.component.html',
  styleUrls: ['./material-search-keyword.component.scss'],
})
export class MaterialSearchKeywordComponent extends BasePage implements OnInit {

  debounceTimer: any; // Debounce timer property

  sub;
  list = [];
  search: '';
  page = 1;

  @Input() inputText = '';
  @Input() subs: any[] = [];

  noSugg = false;
  suggestionsList = [];

  @Output() actionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() setKeywords: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService,
  ) {
    super(injector)

  }

  ngOnInit() {
    // this.events.subscribe('set-form-keywords-list', async (data: any) => {
    // this.list = data;
    this.search = '';
    this.page = 1;
    this.callApi();
    // });
  }

  callApi() {
    return new Promise(async (resolve) => {
      let obj = {
        search: this.search,
        page: this.page,
      };
      this.sub = (await this.network.getKeywords(obj)) as any[];
      this.page = this.sub.current_page;
      if (this.page == 1) {
        this.list = this.sub['data'];
      } else {
        this.list = [...this.list, ...this.sub['data']];
      }
      resolve(true);
    });
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
    return this.list.filter((x) => x.checked == true).length > 0;
  }
  selectedsubject() {
    let list = this.list.filter((x) => x.checked == true);
    this.modals.dismiss(list);
  }

  async addSubject() {
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));
    if (this.inputText) {
      let obj = {
        course_id: course_Id,
        name: this.inputText,
      };
      // return;
      const res = await this.network.addInputKeyword(obj);
      let data = {
        course_id: course_Id,
      };
      const res2 = await this.network.getMyKeyword(data);
      this.inputText = '';
      this.subs = res2.result;
      this.suggestionsList = [];
      this.actionChange.emit({
        subs: this.subs,
      });
    }
  }
  async checkSuggestions(event) {
    this.noSugg = false;
    let v = event.target.value;
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      let res = this.onKeyUp(v);
    }, 500);
  }

  async onKeyUp(data) {
    this.noSugg = false;
    let v = data;
    if (!v || v == '') {
      this.suggestionsList = [];
      return;
    }
    let obj = {
      search: v,
      perpage: 5,
    };
    this.suggestionsList = [];
    const res = await this.network.getKeywords(obj);
    if (res.data) {
      if (this.subs && this.subs.length > 0) {
        const result = res.data.filter(
          (item2) => !this.subs.some((item1) => item1.id === item2.id)
        );
        this.suggestionsList = result;
      } else {
        this.suggestionsList = res.data;
      }
    }
    if (res.data.length == 0) {
      this.noSugg = true;
    } else {
      this.noSugg = false;
    }
  }

  back() {
    this.modals.dismiss();
  }

  async addToSubjects(item) {
    this.inputText = '';

    if(!this.subs){
      this.subs = [];
    }

    if (!this.subs.some((existingItem) => existingItem.id === item.id)) {
      console.log(this.subs, item);
      // this.subs.push(item);
      this.createMaterialService.addKeywordInKeywords(item);

    }

    const result = this.suggestionsList.filter( (item2) => item2.id !== item.id)
    this.suggestionsList = result;




  }
  async removeMySubject(item) {
    let index = this.subs.findIndex((x) => x.id == item.id);
    this.subs.splice(index, 1);
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));
    let obj = {
      course_id: course_Id,
      keyword_id: item.id,
    };
    const res2 = await this.network.removeMyKeyword(obj);
    this.actionChange.emit({
      subs: this.subs,
    });
  }
  showAddSuggestionsButton() {
    if (!this.inputText) {
      return false;
    }
    if (this.inputText && this.suggestionsList.length == 0) {
      return true;
    }
    return false;
  }
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.page = 1;
    this.callApi();
  }

  selectedSubjects() {
    this.modals.dismiss({
      subs: this.subs,
    });
  }
}
