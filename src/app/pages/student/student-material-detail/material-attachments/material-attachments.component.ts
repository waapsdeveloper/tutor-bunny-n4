import { Component, Input, OnInit } from '@angular/core';
import { AttachmentListModule } from "./attachment-list/attachment-list.module";
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-material-attachments',
  templateUrl: './material-attachments.component.html',
  styleUrls: ['./material-attachments.component.scss'],

})
export class MaterialAttachmentsComponent {



    @Input() count = 0;
    list: any[] = [];
    // @Output() openOtherCourses = new EventEmitter<any>();
    // @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

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

    constructor(private network: NetworkService) {
    }

    async getMaterialDocs(id) {
      let obj = {
        study_material_id: id,
      };
      let res = (await this.network.getMaterialDocs(obj)) as any;
      if(res && res.result && res.result.data){
        this.list = res.result.data
      }

    }

    gotoCourseList() {
      // this.openOtherCourses.emit();
    }

    getOtherCourse(events) {

      // this.onChange.emit(events);
    }

}
