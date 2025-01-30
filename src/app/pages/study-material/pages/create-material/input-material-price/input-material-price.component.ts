import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CreateMaterialService } from '../create-material.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-input-material-price',
  templateUrl: './input-material-price.component.html',
  styleUrls: ['./input-material-price.component.scss'],
})
export class InputMaterialPriceComponent implements OnInit {

  price$;
  currency;

  @Input() isRequired = false;
  @Input() needed = true;
  @Input() errorText = 'price is required';
  key = 'price';

  constructor(public createMaterialService: CreateMaterialService, public users: UsersService, public events: EventsService) {
    this.createMaterialService.getPrice().subscribe((value) => {
      this.price$ = parseInt(`${value}`);
    });
  }

  async ngOnInit() {

    this.currency = await this.users.getCurrency() as string;

    this.events.subscribe('teacher-study-material-first-screen-submit-call', (formData) => {
      if (!formData.price || formData.price == '' || formData.price == 0) {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

  }

  result(value, key) {
    this.createMaterialService.setPrice(value);
  }

}
