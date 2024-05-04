import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss'],
})
export class ListCountryComponent implements OnInit {
  list = [];
  country
  search: "";
  page = 1;
  searchTerm: string = '';
  selectedContactId: any = null;
  constructor(private modals: ModalService,private network: NetworkService) {

    this.initialize();
  }

  ngOnInit() {}

  selection(item) {
    this.modals.dismiss(item);
  }
  async initialize() {

    this.search = "";
    this.page = 1;
    this.callApi();
    }

    callApi() {
      return new Promise( async resolve => {

        this.country = await this.network.getCountries() as any[];
        console.log(this.country);
        this.page = this.country.current_page;

        if (this.page == 1) {
          this.list = this.country["data"];
        } else {
          this.list = [...this.list, ...this.country["data"]]
        }

        resolve(true);

      })


    }
  async loadMore($event) {
    this.page = this.country.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }
}
