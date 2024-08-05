import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent extends BasePage  implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  back(){
    this.modals.dismiss()
  }

}
