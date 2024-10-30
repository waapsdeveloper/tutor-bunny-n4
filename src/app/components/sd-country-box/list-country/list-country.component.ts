import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { CountrySqService } from 'src/app/services/sqlite/countries-sq.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss'],
})
export class ListCountryComponent implements OnInit {

  list = [];
  search: "";
  limit = 30;
  offset = 0;
  constructor(private modals: ModalService, private countryService: CountrySqService, private utility: UtilityService) {
    this.initialize();
  }

  ngOnInit() { }



  async initialize() {
    this.search = "";
    this.offset = 0;
    this.callApi();
  }


  callApi() {
    return new Promise(async resolve => {

      let rows = await this.countryService.list(this.search, this.offset, this.limit) as any[];
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

  selection(item) {
    this.modals.dismiss(item);
  }

  back(){
    this.modals.dismiss()
  }
}
