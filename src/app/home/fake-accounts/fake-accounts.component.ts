import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';

const accounts = require('./../../data/users.json');
@Component({
  selector: 'app-fake-accounts',
  templateUrl: './fake-accounts.component.html',
  styleUrls: ['./fake-accounts.component.scss'],
})
export class FakeAccountsComponent implements OnInit {
  list = accounts;
  constructor(private modals: ModalService) {}

  ngOnInit() {}

  openAccount(item) {
    this.modals.dismiss(item);
  }
}
