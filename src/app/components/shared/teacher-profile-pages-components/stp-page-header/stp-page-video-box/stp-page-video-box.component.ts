import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stp-page-video-box',
  templateUrl: './stp-page-video-box.component.html',
  styleUrls: ['./stp-page-video-box.component.scss'],
})
export class StpPageVideoBoxComponent {
  videoUrl: string | null = null;

  constructor(private network: NetworkService) { }


  private _data: any;


  @Input()
  set data(value: any) {
    this._data = value;
    this.setData(value)
  }


  get data(): any {
    return this._data;
  }

  async setData(value: any) {
    let res = await this.network.getIntoVideoFile(value)
    console.log(res);
    if (res?.result?.full_url) {
      this.videoUrl = res.result.full_url;
      console.log(this.videoUrl);

    }
  }

}
