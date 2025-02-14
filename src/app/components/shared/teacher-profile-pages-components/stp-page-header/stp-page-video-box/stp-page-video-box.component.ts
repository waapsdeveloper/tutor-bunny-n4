import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { log } from 'node:console';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stp-page-video-box',
  templateUrl: './stp-page-video-box.component.html',
  styleUrls: ['./stp-page-video-box.component.scss'],
})
export class StpPageVideoBoxComponent {
  doPlay = false;

  videoUrl: string | null = null;

  constructor(private network: NetworkService) {}

  private _data: any;

  @Input()
  set data(value: any) {
    this._data = value;
    this.setData(value);
  }

  get data(): any {
    return this._data;
  }

  async setData(value: any) {
    if (!value) {
      return;
    }
    console.log(value,'aaaaaaaaaaaaaaaaaaaaaa');

    let res = await this.network.getIntoVideoFile(value);
    console.log(res);
    this.videoUrl = res?.result?.full_url || null;
  }

  onVideoError(event: any) {
    console.error('Video failed to load', event);
    this.videoUrl = null; // Reset video if there's an error
  }

  playVIdeo() {
    if (this.videoUrl) {
      this.doPlay = true;
    }
  }
}
