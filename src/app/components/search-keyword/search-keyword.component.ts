import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SubjectListComponent } from '../sd-subject-box/subject-list/subject-list.component';

@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.scss'],
})
export class SearchKeywordComponent extends BasePage implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  noSugg = false;
  subs = [];
  suggestionsList = [];

  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector)
  }

  async ngOnInit() {

    this.events.subscribe('teacher-course-second-screen-submit-call', (formData: any) => {

      let v = formData[this.key];

      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

    this.events.subscribe('update-subs-list', (obj) => {
      this.subs = obj.subs
    })

    this.inputText = '';
    let user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
      name: this.inputText
    }

    const res2 = await this.network.getMySubjects(obj)
    this.subs = res2.result;
    this.onChange.emit(this.subs);
  }

  async openSubjectSelection() {
    const res = (await this.modals.present(SubjectListComponent, {
      subs: this.subs
    })) as any;

    if (res.data) {
      if (res.data.subs) {
        this.subs = res.data.subs;
      }
      this.onChange.emit(this.subs);
    }
  }

  async addSubject() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (this.inputText) {
      let obj = {
        user_id: user.id,
        name: this.inputText
      }
      const res = await this.network.addSubject(obj)
      const res2 = await this.network.getMySubjects(obj)


      this.inputText = '';
      this.subs = res2.result;
      this.suggestionsList = [];


      this.onChange.emit(res2.result);
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
    const res = await this.network.getSubject(obj);
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
    let user = JSON.parse(localStorage.getItem('user'));


    let obj = {
      user_id: user.id,
      name: item.name
    }
    const res = await this.network.addSubject(obj)
    const res2 = await this.network.getMySubjects(obj)


    this.inputText = '';
    this.subs = res2.result;
    this.suggestionsList = [];

    this.onChange.emit(res2.result);

  }

  async removeMySubject(item) {
    let index = this.subs.findIndex(x => x.id == item.id);
    this.subs.splice(index, 1);

    let user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
      subject_id: item.id
    }

    const res2 = await this.network.removeMySubjects(obj)
    this.onChange.emit(this.subs);


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


}

