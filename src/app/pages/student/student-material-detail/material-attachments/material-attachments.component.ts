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
    if (res && res.result && res.result.data) {
      this.list = res.result.data
    }

  }

  async downloadAll() {
    if (this.list && this.list.length > 0) {
      console.log('Download All tapped');

      for (const doc of this.list) {
        if (doc.full_url) {
          console.log('Downloading:', doc.full_url);
          await this.downloadDocument(doc);
        }
      }

      console.log('All downloads completed.');
    } else {
      console.log('No documents available to download.');
    }
  }

  private async downloadDocument(doc: any): Promise<void> {
    return new Promise((resolve) => {
      // Create an anchor element
      const link = document.createElement('a');
      link.href = doc.full_url;

      // Set a filename for download (optional)
      const fileName = doc.document.split('/').pop(); // Extract the filename from the path
      link.download = fileName;

      // Append the anchor to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the anchor from the body after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
        console.log('Downloaded:', doc.document);
        resolve();
      }, 1000); // 1-second delay to ensure the download starts
    });
  }


  getOtherCourse(events) {

    // this.onChange.emit(events);
  }

}
