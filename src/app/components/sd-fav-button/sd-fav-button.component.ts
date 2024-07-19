import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-fav-button',
  templateUrl: './sd-fav-button.component.html',
  styleUrls: ['./sd-fav-button.component.scss'],
})
export class SdFavButtonComponent  implements OnInit {

  @Input() flag: boolean = false;
  constructor() { }

  ngOnInit() {}

}
