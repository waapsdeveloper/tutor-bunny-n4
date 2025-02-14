import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from '../search-filter.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage extends BasePage implements OnInit {

  countryId = null;
  formType = 'filter';
  currency = "$"
  user;

  constructor(injector: Injector, public filters: SearchFilterService, ) {
    super(injector)
    localStorage.setItem('formtype', this.formType)

  }

  ngOnInit() {
    this.loadResolvers();
    this.user = this.dataR.user;

    this.currency = this.user?.student?.country?.currency_symbol ?? "$";
    this.countryId = this.filters.getCountryId();
  }

  result(value: any, key: string): void {
    // this.filters.updateFormData(value, key);
  }

  async submit(){
  //   let res = await this.filters.submitFormData(1) as any;
  //   // console.log(res);
  //   this.events.publish('filter-result',res);
  //   this.nav.pop();

  }
}
