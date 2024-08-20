import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
})
export class SearchBoxPage extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {
  }

  back(){
    this.nav.pop()
  }

  gotoFilter(){
    this.nav.push('search-filter')
  }

}
