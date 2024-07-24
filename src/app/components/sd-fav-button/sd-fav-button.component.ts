import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sd-fav-button',
  templateUrl: './sd-fav-button.component.html',
  styleUrls: ['./sd-fav-button.component.scss'],
})
export class SdFavButtonComponent implements OnInit {

  @Input() flag: boolean = false;
  @Output('addToFav') addToFav: EventEmitter<any> = new EventEmitter<any>();
  @Output('removetoFav') removetoFav: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  async addtoFav() {
    this.addToFav.emit()
  }

  removeToFav() {
    this.removetoFav.emit()

  }

}
