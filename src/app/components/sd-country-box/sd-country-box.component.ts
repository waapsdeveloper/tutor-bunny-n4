import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { ListCountryComponent } from './list-country/list-country.component';
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
  selectedCountry = { name: 'India', flag: '🇮🇳', code: 'IN', dial_code: '+91' };


  constructor(private modals: ModalService,) {

  }

  ngOnInit() { }


  async openCountrySelection() {
    const res = (await this.modals.present(
      ListCountryComponent)) as any;

    console.log(res);

    if (res.data) {
      this.selectedCountry = res.data;
      this.onChange.emit(res.data);
    }
  }

}
