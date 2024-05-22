import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

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

  private _countryId;
  // @Input('countryId') countryId: string;
  @Input()
  public get countryId(): number {
    return this._countryId;
  }

  public set countryId(value: number){
    this._countryId = value;
    this.initialize();

  }





  constructor(private modals: ModalService, private network: NetworkService, private utility: UtilityService) {

  }

  ngOnInit() {
    // this.initialize();
  }

  async initialize() {
    this.search = "";
    this.page = 1;
    this.callApi();
  }
  callApi() {
    return new Promise(async resolve => {


      let obj = {
        search: this.search,
        page: this.page,
        countryId: this.countryId
      }


      this.state = await this.network.getStates(obj) as any[];
      this.page = this.state["current_page"];
      if (this.page == 1) {
        this.list = this.state["data"];

      } else {
        this.list = [...this.list, ...this.state["data"]]
      }
      resolve(true);
    })
  }
  async loadMore($event) {
    this.page = this.state.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }
  selection(item) {
    this.modals.dismiss(item);
  }


  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.page = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  capitalizeFirst(string){
    return this.utility.capitalizeEachFirst(string)
  }
}
