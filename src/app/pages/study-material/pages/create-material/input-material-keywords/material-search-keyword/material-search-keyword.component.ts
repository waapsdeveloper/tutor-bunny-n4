import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { KeywordListComponent } from './keyword-list/keyword-list.component';

@Component({
  selector: 'app-material-search-keyword',
  templateUrl: './material-search-keyword.component.html',
  styleUrls: ['./material-search-keyword.component.scss'],
})
export class MaterialSearchKeywordComponent extends BasePage implements OnInit {

  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  noSugg = false;
  @Input() subs: any[] = [];
  suggestionsList = [];


  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit() {

  }

  callApi() {}

  async openSubjectSelection() {

    const res = (await this.modals.present(KeywordListComponent, {
      subs: this.subs,
    })) as any;
    console.log(res);

    if (res.data) {
      if (res.data.subs) {
        this.subs = res.data.subs;
      }
      this.onChange.emit(this.subs);
    }
  }

}
