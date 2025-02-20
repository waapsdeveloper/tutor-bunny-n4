import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';

@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.component.html',
  styleUrls: ['./gallery-viewer.component.scss'],
})
export class GalleryViewerComponent  implements OnInit {

  @Input() list: any[] = [];  

  constructor(public modals: ModalService) { }

  ngOnInit() {}

  viewImage(item){

  }

}
