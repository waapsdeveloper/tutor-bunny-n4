import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { resolve } from 'path';
import { ModalService } from 'src/app/services/basic/modal.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent implements OnInit, OnDestroy {
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
  back(){
    this.modals.dismiss()
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

    this.onChange.emit({
      subs: this.subs
    });

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
    this.onChange.emit({
      subs: this.subs
    });


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
    this.search = query;
    this.page = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  selectedSubjects() {
    this.modals.dismiss({
      subs: this.subs
    });
  }




}
