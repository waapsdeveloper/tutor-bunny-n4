import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {

  formData={
    keywords: null,
    language:null
  }

  constructor() { }

  ngOnInit() {
  }

  result(value, key){
    console.log(value);

  }

}
