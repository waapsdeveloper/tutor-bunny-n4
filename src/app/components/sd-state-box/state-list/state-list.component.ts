import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { CountrySqService } from 'src/app/services/sqlite/countries-sq.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss'],
})
export class StateListComponent  implements OnInit {
  list = [];
  search: "";
  limit = 30;
  offset = 0;

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

  constructor(private modals: ModalService, private network: NetworkService,private countryService: CountrySqService, private utility: UtilityService) {

  }

  ngOnInit() {
    ;
  }

  async initialize() {
    this.search = "";
    this.offset = 1;
    this.callApi();
  }
  callApi() {
    return new Promise(async resolve => {
      console.log(this.countryId);


      let rows = await this.countryService.stateList(this.countryId ,this.search, this.offset, this.limit) as any[];
      console.log(rows);

      if (this.offset == 0) {
        this.list = rows;
      } else {
        this.list = [...this.list, ...rows]
      }
      resolve(true);

      // this.state = await this.network.getStates(obj) as any[];
      // this.offset = this.state["current_page"];
      // if (this.offset == 1) {
      //   this.list = this.state["data"];

      // } else {
      //   this.list = [...this.list, ...this.state["data"]]
      // }
      resolve(true);
    })
  }

  back(){
    this.modals.dismiss()
  }
  async loadMore($event) {
    this.offset = this.state.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }
  selection(item) {
    this.modals.dismiss(item);
  }


  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.offset = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  capitalizeFirst(string){
    return this.utility.capitalizeEachFirst(string)
  }
}
