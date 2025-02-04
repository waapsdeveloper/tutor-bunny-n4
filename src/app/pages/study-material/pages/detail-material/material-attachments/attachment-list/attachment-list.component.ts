import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss'],
})
export class AttachmentListComponent  implements OnInit {

  @Input() list: any[] = [];

  constructor() { }

  ngOnInit() {}

  // setBackgroundImage(item) {
  //   // return `url('${item.image}')`;
  //   console.log(item)
  //   item.type = item.file_type;


  //   let path = "assets/svg/filetypes/";
  //   if (item.type.includes("pdf")) {
  //     path += "pdf.svg";
  //   } else

  //   if (item.type.includes("sheet") ) {
  //     path += "xls.svg";
  //   } else

  //   if (item.type.includes("document")) {
  //     path += "doc.svg";
  //   }

  //   if (item.type.includes("image")) {
  //     path += "png.svg";
  //   }


  //   return `url(${path})`;
  // }
  // setBackgroundImage(item): string {
  //   return 'assets/svg/file-icon-large.svg';
  //   // return `url('${item.full_url}')`;
  // }
  formatFileType(value: string): string {
    if (!value) return '';

    const parts = value.split('/');
    if (parts.length === 2) {
      return parts[1].toUpperCase();
    } else if (parts.length > 2) {
      return parts[parts.length - 1].toUpperCase();
    }
    return value;
  }

}
