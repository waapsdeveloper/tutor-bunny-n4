import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

const accounts = require('../../../data/users.json');
@Component({
  selector: 'app-fake-accounts',
  templateUrl: './fake-accounts.component.html',
  styleUrls: ['./fake-accounts.component.scss'],
})
export class FakeAccountsComponent implements OnInit {
  list = accounts;
  user: any;
  @Input('role') role = '1';
  constructor(private modals: ModalService,
    private network: NetworkService,
    private users: UsersService
  ) {}

  ngOnInit() {
    this.list = (accounts as any[]).filter( x => x.role_id == this.role);
  }

  async openAccount(item) {
    const res = await this.network.login(item) as any;
    if(res){
      const user = res.user;
      this.users.setUser(user);
      this.modals.dismiss(user);
    }
  }
}
