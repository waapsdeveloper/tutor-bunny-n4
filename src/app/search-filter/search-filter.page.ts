import { Component, Injector, OnInit } from '@angular/core';
import { SearchFilterService } from '../services/search-filter.service';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage extends BasePage implements OnInit {
  countryId = null;
  formType = 'filter';
  curruncy;

  constructor(public searchFilterService: SearchFilterService, injector: Injector) {
    super(injector)
    localStorage.setItem('formtype', this.formType)
    let user = this.users.getUser()
    this.curruncy =user.student.country.currency_symbol;
  }

  ngOnInit() {
    this.countryId = this.searchFilterService.getCountryId();
  }

  result(value: any, key: string): void {
    this.searchFilterService.updateFormData(value, key);
  }

  async submit(): Promise<void> {
    let res = await this.searchFilterService.submitFormData() as any;

  }
}
