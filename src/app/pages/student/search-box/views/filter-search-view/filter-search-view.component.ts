import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-filter-search-view',
  templateUrl: './filter-search-view.component.html',
  styleUrls: ['./filter-search-view.component.scss'],
})
export class FilterSearchViewComponent  implements OnInit {

  constructor(private events: EventsService) { }

  ngOnInit() {
    this.events.subscribe('tag-input-search-triggered', this.triggerSearchWithParams.bind(this));
  }

  triggerSearchWithParams(data: any){
    console.log('triggerSearch', data);
  }

}
