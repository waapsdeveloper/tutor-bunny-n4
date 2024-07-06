import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { SubjectListComponent } from '../../sd-subject-box/subject-list/subject-list.component';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrls: ['./keyword-list.component.scss'],
})
export class KeywordListComponent implements OnInit {
  list = [];
  sub
  search: "";
  page = 1;
  selectedContactId: any = null;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  noSugg = false;
  @Input() subs = [];
  suggestionsList = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modals: ModalService, private network: NetworkService, private events: EventsService) {
    this.initialize()
  }
  ngOnDestroy(): void {
    this.events.publish('update-subs-list', {
      subs: this.subs
    })
  }
  ngOnInit() {
  }
  async initialize() {
    this.events.subscribe('course_Id_get', async (course_Id: any) => {
      this.search = "";
      this.page = 1;
      this.callApi();
    })
  }
  callApi() {
    return new Promise(async resolve => {
      let obj = {
        search: this.search,
        page: this.page
      }
      this.sub = await this.network.getKeywords(obj) as any[];
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
    this.modals.dismiss(list);
  }
  async openSubjectSelection() {
    const res = (await this.modals.present(
      SubjectListComponent,
    )) as any;
    if (res.data) {
      this.onChange.emit(res.data);
    }
  }
  async addSubject() {
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));
    if (this.inputText) {
      let obj = {
        course_id: course_Id,
        name: this.inputText
      }
      // return;
      const res = await this.network.addInputKeyword(obj)
      let data = {
        course_id: course_Id,
      }
      const res2 = await this.network.getMyKeyword(data)
      this.inputText = '';
      this.subs = res2.result;
      this.suggestionsList = [];
      this.onChange.emit({
        subs: this.subs
      });
    }
  }
  async checkSuggestions($event) {
    this.noSugg = false;
    let v = $event.target.value;
    if (!v || v == '') {
      this.suggestionsList = []
      return;
    }
    let obj = {
      search: v,
      perpage: 5
    }
    this.suggestionsList = [];
    const res = await this.network.getKeywords(obj);
    if (res.data) {
      this.suggestionsList = res.data;
    }
    if (res.data.length == 0) {
      this.noSugg = true;
    } else {
      this.noSugg = false;
    }
  }
  async addToSubjects(item) {
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));
    let obj = {
      course_id: course_Id,
      keyword_id: item.id
    }

    const res = await this.network.addKeyword(obj)

    let data = {
      course_id: course_Id,
    }

    const res2 = await this.network.getMyKeyword(data);
    this.inputText = '';
    this.subs = res2.result;

    this.suggestionsList = [];

    this.onChange.emit({
      subs: this.subs
    });
  }
  async removeMySubject(item) {
    let index = this.subs.findIndex(x => x.id == item.id);
    this.subs.splice(index, 1);
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));
    let obj = {
      course_id: course_Id,
      keyword_id: item.id
    }
    const res2 = await this.network.removeMyKeyword(obj)
    this.onChange.emit({
      subs: this.subs
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
      subs: this.subs
    });
  }
}
