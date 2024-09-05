import { Component, OnInit } from '@angular/core';
import { SearchFilterService } from '../services/search-filter.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  countryId = null;
  formType = 'filter';

  constructor(public searchFilterService: SearchFilterService) {
    localStorage.setItem('formtype', this.formType)
  }

  ngOnInit() {
    this.countryId = this.searchFilterService.getCountryId();
  }

  result(value: any, key: string): void {
    this.searchFilterService.updateFormData(value, key);
  }

  submit(): void {
    this.searchFilterService.submitFormData();
  }
}
