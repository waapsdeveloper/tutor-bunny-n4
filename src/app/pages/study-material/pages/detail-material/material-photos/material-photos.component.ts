import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-material-photos',
  templateUrl: './material-photos.component.html',
  styleUrls: ['./material-photos.component.scss'],
})
export class MaterialPhotosComponent  implements OnInit {



  private _material_Id: any;
  materialImages: any[] = [];
  @Input() materialId;
  
  public get material_Id() {
    return this._material_Id;
  };

  public set course_Id(value: any) {
    this._material_Id = value;
    if(value){
      this.getCourseImages(value)
    }

  }


  constructor(public network: NetworkService) {
  }

  ngOnInit() {
console.log();
  }

  async getCourseImages(id){
    let obj = {
      material_id: id
    }
    let res  = await this.network.getCourseImages(obj) as any;
    this.materialImages = res.result;
    console.log(this.materialImages);

  }


}
