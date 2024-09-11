import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }



  ngOnInit() {
  }

}
