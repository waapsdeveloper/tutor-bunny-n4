import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from 'src/app/services/search-filter.service';

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

  constructor(public searchFilterService: SearchFilterService, injector: Injector) {
    super(injector)
    localStorage.setItem('formtype', this.formType)

  }

  ngOnInit() {
    this.loadResolvers();
    this.user = this.dataR.user;

    this.currency = this.user?.student?.country?.currency_symbol ?? "$";


    this.countryId = this.searchFilterService.getCountryId();
  }

  result(value: any, key: string): void {
    this.searchFilterService.updateFormData(value, key);
  }

  async submit(): Promise<void> {
    let res = await this.searchFilterService.submitFormData(1) as any;

    const params = {
      filter: JSON.stringify(res),
    };
    this.nav.push('search-result', params);

  }
}
