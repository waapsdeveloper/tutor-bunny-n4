import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { LanguageListComponent } from '../sd-language-box/language-list/language-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { NetworkService } from 'src/app/services/network.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-sd-subject-box',
  templateUrl: './sd-subject-box.component.html',
  styleUrls: ['./sd-subject-box.component.scss'],
})
export class SdSubjectBoxComponent implements OnInit {
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

  constructor(private network: NetworkService, private events: EventsService) { }

  async ngOnInit() {

    this.events.subscribe('teacher-profile-first-screen-submit-call', (formData: any) => {

      let v = formData[this.key];
      console.log(v)

      if(!v || v == ''){
        this.isRequired = true;
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

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

  // async openSubjectSelection() {
  //   const res = (await this.modals.present(
  //     SubjectListComponent,
  //   )) as any;
  //   console.log(res);
  //   if (res.data) {
  //     console.log(res.data);
  //     this.onChange.emit(res.data);
  //   }
  // }

  async addSubject() {
    console.log(this.inputText)

    let user = JSON.parse(localStorage.getItem('user'));

    if (this.inputText) {
      let obj = {
        user_id: user.id,
        name: this.inputText
      }
      const res = await this.network.addSubject(obj)
      console.log(res);

      const res2 = await this.network.getMySubjects(obj)
      console.log(res2);


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
    console.log(res);
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
    console.log(res);

    const res2 = await this.network.getMySubjects(obj)
    console.log(res2);


    this.inputText = '';
    this.subs = res2.result;
    this.suggestionsList = [];

    this.onChange.emit(res2.result);

  }

  async removeMySubject(item) {
    console.log(item);
    let index = this.subs.findIndex(x => x.id == item.id);
    this.subs.splice(index, 1);

    let user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
      subject_id: item.id
    }

    const res2 = await this.network.removeMySubjects(obj)
    console.log(res2);
    this.onChange.emit(this.subs);


  }

  showAddSuggestionsButton(){

    if(!this.inputText){
      return false;
    }

    if(this.inputText && this.suggestionsList.length == 0){
      return true;
    }

    return false;
  }


}

