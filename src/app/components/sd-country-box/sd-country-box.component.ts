import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { ListCountryComponent } from './list-country/list-country.component';
import { UtilityService } from 'src/app/services/utility.service';
const countries = require('src/app/data/country_dial_info.json');
@Component({
  selector: 'app-sd-country-box',
  templateUrl: './sd-country-box.component.html',
  styleUrls: ['./sd-country-box.component.scss'],
})
export class SdCountryBoxComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  selectedCountry = {
    "id": 99,
    "iso": "in",
    "name": "India",
    "nicename": "India",
    "iso3": "IND",
    "numcode": 356,
    "dial_code": 91,
    "created_at": null,
    "updated_at": null
  };


  constructor(private modals: ModalService, private utility: UtilityService) {

  }

  ngOnInit() { }


  async openCountrySelection() {
    const res = (await this.modals.present(
      ListCountryComponent)) as any;

    console.log(res);

    if (res.data) {

      const d = res.data;
      d['name'] = this.utility.capitalizeEachFirst(d['name']);
      this.selectedCountry = d;
      this.onChange.emit(res.data);
    }
  }

}
