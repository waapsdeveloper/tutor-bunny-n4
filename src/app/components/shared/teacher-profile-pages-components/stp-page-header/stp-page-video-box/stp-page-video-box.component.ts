import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stp-page-video-box',
  templateUrl: './stp-page-video-box.component.html',
  styleUrls: ['./stp-page-video-box.component.scss'],
})
export class StpPageVideoBoxComponent implements OnInit {
  
  constructor(private network: NetworkService) {}
  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
  }

  get data(): any {
    return this._data;
  }

    async ngOnInit() {
      console.log(this.data);
      let res = await this.network.getIntoVideoFile(this.data);
      console.log(res);
    }

}
