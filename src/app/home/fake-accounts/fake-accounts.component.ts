import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';

const accounts = require('./../../data/users.json');
@Component({
  selector: 'app-fake-accounts',
  templateUrl: './fake-accounts.component.html',
  styleUrls: ['./fake-accounts.component.scss'],
})
export class FakeAccountsComponent implements OnInit {
  list = accounts;
  constructor(private modals: ModalService,
    private network: NetworkService
  ) {}

  ngOnInit() {}

  async openAccount(item) {
    console.log(item);

    let res = await this.network.login(item)
    console.log(res);

    // return

    this.modals.dismiss(res);
  }
}
