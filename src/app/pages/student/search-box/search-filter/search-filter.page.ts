import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from '../search-filter.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage extends BasePage implements OnInit {

  formData$: any = {
    keywords: [],
    price_range: [0, 1000],
  }

  formType = 'filter';
  currency = "$"
  
  user;

  constructor(injector: Injector, public filters: SearchFilterService, ) {
    super(injector)
  }

  ngOnInit() {

    this.loadResolvers();
    this.user = this.dataR.user;
    this.currency = this.user?.student?.country?.currency_symbol ?? "$";
    this.filters.getFormData().subscribe(data => {
      this.formData$ = data;
      console.log(this.formData$)
    });
    
  }

  result(value: any, key: string): void {

    if(key === 'mode_type'){
      console.log(value)
      this.filters.updateFormData(value.mode, 'mode_type');
      this.filters.updateFormData(value.capacity, 'capacity');
      return 
    }
    console.log(value, key)
    this.filters.updateFormData(value, key);
  }

  async submit(){
  //   let res = await this.filters.submitFormData(1) as any;
  //   // console.log(res);
  //   this.events.publish('filter-result',res);
  //   this.nav.pop();

  }
}
