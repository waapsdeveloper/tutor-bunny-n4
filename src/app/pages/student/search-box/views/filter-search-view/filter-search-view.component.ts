import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-filter-search-view',
  templateUrl: './filter-search-view.component.html',
  styleUrls: ['./filter-search-view.component.scss'],
})
export class FilterSearchViewComponent implements OnInit {
  
  ngOnInit(): void {
    console.log("testFilter search");
  }
  
}
