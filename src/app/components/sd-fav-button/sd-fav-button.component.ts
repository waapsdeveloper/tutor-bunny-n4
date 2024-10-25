import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-sd-fav-button',
  templateUrl: './sd-fav-button.component.html',
  styleUrls: ['./sd-fav-button.component.scss'],
})
export class SdFavButtonComponent implements OnInit {
  showFav = false;

  @Input() flag: boolean = false;
  @Output('addToFav') addToFav: EventEmitter<any> = new EventEmitter<any>();
  @Output('removetoFav') removetoFav: EventEmitter<any> = new EventEmitter<any>();

  constructor(public globalCourses: GlobalCoursesService, public globalTrials: GlobalTrialsService, public events: EventsService, public nav: NavService) { }

  ngOnInit() {
    this.events.subscribe('show-fav-dot', (showFav) => {
      console.log(showFav);
      this.showFav = showFav;

    });
  }

  async addtoFav() {

    this.addToFav.emit()
  }

  removeToFav() {

    this.removetoFav.emit()

  }
  async showFavCourse() {
    this.nav.push('/fav-courses')
  }


}
