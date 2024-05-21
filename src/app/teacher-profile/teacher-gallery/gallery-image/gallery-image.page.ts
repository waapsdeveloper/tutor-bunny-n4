import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.page.html',
  styleUrls: ['./gallery-image.page.scss'],
})
export class GalleryImagePage extends BasePage implements OnInit {
params
backBtn ='';
image= " "

  constructor(injector:Injector) { 

    super(injector)
  }

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

   
    if (this.params.backUrl) {
      this.backBtn = this.params.backUrl;
    }
    
    if (this.params.image) {
      this.image = this.params.image;
    }


  }
  back() {
    this.nav.pop(this.backBtn);
  }

  ngOnInit() {
  }

}
