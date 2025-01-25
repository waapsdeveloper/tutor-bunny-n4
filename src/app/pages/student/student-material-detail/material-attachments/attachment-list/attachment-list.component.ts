import { Component, Input, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss'],
})
export class AttachmentListComponent  implements OnInit {


  @Input() list: any[] = [];

  constructor() { }

  ngOnInit() {
    console.log();
  }

  setBackgroundImage(item) {
    // return `url('${item.image}')`;
    console.log(item)
    item.type = item.file_type;


    let path = "assets/svg/filetypes/";
    if (item.type.includes("pdf")) {
      path += "pdf.svg";
    } else

    if (item.type.includes("sheet") ) {
      path += "xls.svg";
    } else

    if (item.type.includes("document")) {
      path += "doc.svg";
    }

    if (item.type.includes("image")) {
      path += "png.svg";
    }


    return `url(${path})`;
  }


}
