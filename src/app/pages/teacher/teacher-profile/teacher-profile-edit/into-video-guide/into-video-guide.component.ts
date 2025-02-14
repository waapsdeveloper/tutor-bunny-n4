import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';

@Component({
  selector: 'app-into-video-guide',
  templateUrl: './into-video-guide.component.html',
  styleUrls: ['./into-video-guide.component.scss'],
})
export class IntoVideoGuideComponent  implements OnInit {

  constructor(private modals: ModalService) { }

  ngOnInit() {}

  back(){
    this.modals.dismiss();
  }

}
