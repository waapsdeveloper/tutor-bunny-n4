import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { StatesSqService } from 'src/app/services/sqlite/states-sq.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss'],
})
export class StateListComponent {
  list = [];
  search: "";
  offset = 0;
  limit = 30;

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

  constructor(private modals: ModalService, private network: NetworkService, private utility: UtilityService, private statesService: StatesSqService) {

  }

  async initialize() {
    this.search = "";
    this.offset = 0;
    this.callApi();
  }
  callApi() {
    return new Promise(async resolve => {


      let rows = await this.statesService.list(this.countryId, this.search, this.offset, this.limit) as any[];
      console.log(rows);
      if (this.offset == 0) {
        this.list = rows;
      } else {
        this.list = [...this.list, ...rows]
      }
      resolve(true);
    })
  }


  async loadMore($event) {
    this.offset = this.list.length;
    await this.callApi();
    $event.target.complete();
  }
  selection(item) {
    this.modals.dismiss(item);
  }


  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.offset = 0;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  capitalizeFirst(string){
    return this.utility.capitalizeEachFirst(string)
  }

  back(){
    this.modals.dismiss()
  }
}
