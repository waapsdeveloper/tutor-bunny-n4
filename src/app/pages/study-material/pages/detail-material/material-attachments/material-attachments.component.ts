import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CartService } from 'src/app/services/cart.service';
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-material-attachments',
  templateUrl: './material-attachments.component.html',
  styleUrls: ['./material-attachments.component.scss'],
})
export class MaterialAttachmentsComponent{
  @Input() count = 0;
  @Input() isPurchased:number;

  materialIds;



  list: any[] = [];
  // @Output() openOtherCourses = new EventEmitter<any>();
  // @Output('onChange') onChange: EventEmitter<any> = new EvesntEmitter<any>();

  private _materialId;
  @Input()
  public get materialId(): any[] {
    return this._materialId;
  }

  public set materialId(value: any[]) {
    this._materialId = value;

    if (value) {
      this.getMaterialDocs(value);
    }
  }


  constructor(private network: NetworkService, public utility: UtilityService, private cartService: CartService,private nav:NavService,private globalStudyMaterialService: GlobalStudyMaterialService) {

  }

  async getMaterialDocs(id) {
    let obj = {
      study_material_id: id,
    };
    let res = (await this.network.getMaterialDocs(obj)) as any;
    if (res && res.result && res.result.data) {
      this.list = res.result.data;
      console.log('List', this.list);
    }
  }

  gotoCourseList() {
    // this.openOtherCourses.emit();
  }

  getOtherCourse(events) {
    // this.onChange.emit(events);
  }
  addToCart() {
    console.log('Add to cart clicked');

  }
  async downloadAll() {
    console.log('D all clicked', this._materialId);
    let obj = {
      study_material_id : this._materialId
    }
    const res  =await this.network.downloadAttachment(obj);
    console.log('Download all clicked',res);
  }

}
