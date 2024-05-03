import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent  implements OnInit {
  list = [];
  sub
  selectedContactId: any = null;
  constructor(private modals: ModalService, private network: NetworkService) {
    this.initialize()
  }
  ngOnInit() { }
  async initialize() {
    this.sub = await this.network.getSubject() as any[];
    this.list = this.sub.data.data;
    console.log(this.list);
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
}
