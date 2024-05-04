import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss'],
})
export class StateListComponent  implements OnInit {
  list = [];
  search: "";
  page = 1;
  state;
  searchTerm: string = '';
  @Input() countryId: string;
  constructor(private modals: ModalService, private network: NetworkService) {
    this.initialize();
    console.log(this.countryId);

  }

  ngOnInit() {}

  async initialize() {
    this.search = "";
    this.page = 1;
    this.callApi();
  }
  callApi() {
    return new Promise(async resolve => {
      this.state = await this.network.getStates(this.countryId) as any[];
      console.log(this.state);
      this.page = this.state["current_page"];
      console.log(this.page);
      if (this.page == 1) {
        this.list = this.state["data"];

      } else {
        this.list = [...this.list, ...this.state["data"]]
        console.log(this.list);


      }
      resolve(true);
    })
  }
  async loadMore($event) {
    this.page = this.state.current_page + 1;
    console.log(this.page);
    await this.callApi();
    $event.target.complete();
  }
  selection(item) {
    this.modals.dismiss(item);
  }
}
