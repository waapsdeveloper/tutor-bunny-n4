import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss'],
})
export class ListCountryComponent implements OnInit {
  @Input() list = [];
  constructor(private modals: ModalService) {}

  ngOnInit() {}

  selection(item) {
    this.modals.dismiss(item);
  }
}
