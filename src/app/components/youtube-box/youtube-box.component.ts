import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-box',
  templateUrl: './youtube-box.component.html',
  styleUrls: ['./youtube-box.component.scss'],
})
export class YoutubeBoxComponent implements OnInit {
  list;

  constructor(private _sanitizer: DomSanitizer, private network: NetworkService) {
    this.initialize();
  }

  ngOnInit() {}

  async initialize() {
    const res = await this.network.getvideos();
    this.list = res.data;
  }

  getLink(item) {
    const safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(item.link);
    return safeURL;
  }
}
