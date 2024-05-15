import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicSlides } from '@ionic/angular';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.scss'],
})
export class YoutubeListComponent  implements OnInit {
  @ViewChild('slides', { static: false }) slides: any;
  constructor(private _sanitizer: DomSanitizer) {
    this.initialize();
  }

  ngOnInit() {}

  async initialize() {
  
  }

  getLink(item) {
    const safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(item.link);
    return safeURL;
  }
  async onSlideChange() {
   
    this.slides?.nativeElement.swiper.slideTo(1, false, false);
  }
}
