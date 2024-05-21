import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
})
export class MyGalleryComponent extends BasePage  implements OnInit {

  constructor(injector: Injector) {

    super(injector)
   }

  ngOnInit() {}

  goToGallery() {
    this.nav.push('/teacher-profile/teacher-gallery' , {

      backUrl: '/teacher-profile',
      gallary: "false", title: 'My Gallery'
    })
  }

}
