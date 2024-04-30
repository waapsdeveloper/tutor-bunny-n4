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
  user: any;
  constructor(private modals: ModalService,
    private network: NetworkService
  ) {}

  ngOnInit() {}

  async openAccount(item) {
    console.log(item);

    this.user = await this.network.login(item) as any[];
    console.log(this.user.user);


    let user = this.user.user;

    localStorage. setItem("user", JSON.stringify(user) );

    // return

    this.modals.dismiss(user);
  }
}
