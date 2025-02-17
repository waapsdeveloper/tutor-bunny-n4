import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-docs',
  templateUrl: './input-material-docs.component.html',
  styleUrls: ['./input-material-docs.component.scss'],
})
export class InputMaterialDocsComponent implements OnInit {
  doc$;
  docsLength = 0;

  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'At least 1 document required';
  key = 'docs';

  @Output() openDocsView = new EventEmitter<any>();

  constructor(
    public createMaterialService: CreateMaterialService,
    public events: EventsService
  ) {
    this.createMaterialService.getDocs().subscribe((value) => {
      let docs = value;
      if (docs.length > 0) {
        this.docsLength = docs.length;
        this.doc$ = docs[0];
      } else {
        this.doc$ = null;
      }
    });
  }

  ngOnInit() {
    this.events.subscribe(
      'teacher-study-material-second-screen-submit-call',
      (formData) => {
        let v = formData[this.key];

        if (!v || v == '' || v.length == 0) {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      },
      false
    );
  }

  openMaterialPhotos() {
    this.openDocsView.emit();

    // this.nav.push('/material-photoss', {
    //   backUrl: '',
    //   gallary: 'true',
    //   title: 'Upload Material Photos',
    // });
  }

  setBackgroundImage(docObj: { doc: string; type: string, file_type: string }): string {
    // Let path = 'assets/svg/filetypes/';
    // const fileType = docObj.type || docObj.file_type || ''; // Check for both keys, fallback to an empty string

    // if (fileType.includes('pdf')) {
    //   path += 'pdf.svg';
    // } else if (fileType.includes('sheet')) {
    //   path += 'xls.svg';
    // } else if (fileType.includes('document')) {
    //   path += 'doc.svg';
    // } else if (fileType.includes('image')) {
    //   path += 'png.svg';
    // }

    // return `url(${path})`;

    return `url('assets/svg/file-icon-large.svg')`;
  }
}
