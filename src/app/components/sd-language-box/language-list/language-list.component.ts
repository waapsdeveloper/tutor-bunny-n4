import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent implements OnInit {
  list = [];
  lang
  selectedContactId: any = null;
  constructor(private modals: ModalService, private network: NetworkService) {
    this.initialize()
  }
  ngOnInit() { }
  async initialize() {
    this.lang = await this.network.getLanguage() as any[];
    this.list = this.lang.data.data;
    console.log(this.list);
  }
  selection(item: any) {
    this.modals.dismiss(item);
  }
  isListItemSelected() {
    return this.list.filter(x => x.checked == true).length > 0;
  }
  selectedLanguage() {
    let list = this.list.filter(x => x.checked == true);
    console.log(list);
    this.modals.dismiss(list);
  }
}
