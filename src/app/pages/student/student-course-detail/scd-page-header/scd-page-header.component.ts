import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-header',
  templateUrl: './scd-page-header.component.html',
  styleUrls: ['./scd-page-header.component.scss'],
})
export class ScdPageHeaderComponent  implements OnInit {
showFavValue;

addToFav() {
}
removeToFav() {
}

  constructor() { }

  ngOnInit() {}

}
