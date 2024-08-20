import { Component, OnInit } from '@angular/core';
import { SearchFilterService } from '../services/search-filter.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {

  countryId = null;
  stateId: string | null = null;

  constructor(public searchFilterService: SearchFilterService) { }

  ngOnInit() {
    this.countryId = this.searchFilterService.getCountryId();
    this.stateId = this.searchFilterService.getStateId();
  }

  result(value: any, key: string): void {
    this.searchFilterService.updateFormData(value, key);
  }

  submit(): void {
    this.searchFilterService.submitFormData();
  }
}
