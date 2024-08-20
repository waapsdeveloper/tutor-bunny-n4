import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-profile-search-box',
  templateUrl: './profile-search-box.component.html',
  styleUrls: ['./profile-search-box.component.scss'],
})
export class ProfileSearchBoxComponent extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  openSearch(){
    this.nav.push('search-box')
  }

}
