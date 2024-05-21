import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(private modals: ModalService, private network: NetworkService) {
    this.initialize()

  }
  ngOnInit() {
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
  async openSubjectSelection() {
    const res = (await this.modals.present(
      SubjectListComponent,
    )) as any;
    console.log(res);
    if (res.data) {
      console.log(res.data);
      this.onChange.emit(res.data);
    }
  }

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

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.search = query;
    this.page = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  selectedSubjects() {
    let list = this.list.filter(x => x.checked == true);
    console.log(list);
    this.modals.dismiss(list);
  }


}
