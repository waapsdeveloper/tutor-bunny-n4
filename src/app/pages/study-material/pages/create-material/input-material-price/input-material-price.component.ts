import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-price',
  templateUrl: './input-material-price.component.html',
  styleUrls: ['./input-material-price.component.scss'],
})
export class InputMaterialPriceComponent  implements OnInit {

  price: string = '';
  currency;
  constructor(public createMaterialService: CreateMaterialService, public users: UsersService) { }

  async ngOnInit() {
    console.log("material price init")
    this.currency = await this.users.getCurrency() as string;
    this.price = await this.createMaterialService.getPrice() as string;
  }

  result(value, key) {
    this.price = value;
    this.createMaterialService.setPrice(value);
  }

}
