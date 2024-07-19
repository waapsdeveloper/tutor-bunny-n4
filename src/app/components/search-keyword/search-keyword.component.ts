import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SubjectListComponent } from '../sd-subject-box/subject-list/subject-list.component';
import { KeywordListComponent } from './keyword-list/keyword-list.component';

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
  @Input() subs: any[] = [];
  suggestionsList = [];

  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector)
  }

  async ngOnInit() {

    this.events.subscribe('teacher-course-second-screen-submit-call', async (formData: any) => {

      let v = formData[this.key];

      if (this.subs && this.subs.length == 0) {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false);

    this.events.subscribe('set-form-keywords-list', async (data: any) => {
      let course_Id = JSON.parse(localStorage.getItem('course_Id'));
      console.log(course_Id);


      let obj = {
        course_id: course_Id,
        name: this.inputText
      }

      const res2 = await this.network.getMyKeyword(obj)
      this.subs = res2.result;
      this.onChange.emit(this.subs);
    })

    this.events.subscribe('update-subs-list', (obj) => {
      this.subs = obj.subs
    })

    this.inputText = '';

  }

  async openSubjectSelection() {
    const res = (await this.modals.present(KeywordListComponent, {
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
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));
    if (this.inputText) {
      let obj = {
        course_id: course_Id,
        name: this.inputText
      }
      const res = await this.network.addKeyword(obj)
      const res2 = await this.network.getMyKeyword(obj)


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
    let course_Id = JSON.parse(localStorage.getItem('course_Id'));


    let obj = {
      course_id: course_Id,
      name: item.name
    }
    const res = await this.network.addKeyword(obj)
    const res2 = await this.network.getMyKeyword(obj)


    this.inputText = '';
    this.subs = res2.result;
    this.suggestionsList = [];

    this.onChange.emit(res2.result);

  }

  async removeMySubject(item) {
    let index = this.subs.findIndex(x => x.id == item.id);
    this.subs.splice(index, 1);

    let course_Id = JSON.parse(localStorage.getItem('course_Id'));

    let obj = {
      course_id: course_Id,
      subject_id: item.id
    }

    const res2 = await this.network.removeMyKeyword(obj)
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

