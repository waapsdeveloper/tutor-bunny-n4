import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss'],
})
export class StateListComponent  implements OnInit {
  @Input() list = [];
  constructor(private modals: ModalService) {}

  ngOnInit() {}

  selection(item) {
    this.modals.dismiss(item);
  }
}
