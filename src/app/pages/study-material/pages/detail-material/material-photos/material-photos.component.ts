import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-material-photos',
  templateUrl: './material-photos.component.html',
  styleUrls: ['./material-photos.component.scss'],
})
export class MaterialPhotosComponent implements OnInit {
  private _materialId: any;
  materialImages: any[] = [];
  @Input()
  public get materialId() {
    return this._materialId;
  }
  public set materialId(value: any) {
    this._materialId = value;
    if (value) {
      this.getMaterialImages(value);
    }
  }

  constructor(public network: NetworkService) {}

  ngOnInit() {

  }

  async getMaterialImages(id) {
    let obj = {
      study_material_id: id,
    };
    let res = (await this.network.getMaterialImages(obj)) as any;
    this.materialImages = res.result;

  }
}
