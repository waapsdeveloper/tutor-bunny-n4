import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { ListCountryComponent } from './list-country/list-country.component';
import { UtilityService } from 'src/app/services/utility.service';
import { EventsService } from 'src/app/services/events.service';
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
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;

  private _country;

  @Input()
  public set country(value: any){
    this._country = value;
    console.log(value);
    if(value && value.name){
      this.selectedCountry = value;
    }

  }

  public get country(): any{
    return this._country
  }







  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  selectedCountry = {
    "id": 0,
    "iso": "",
    "name": "",
  };


  constructor(private modals: ModalService, private utility: UtilityService, private events: EventsService) {

  }

  ngOnInit() {
    this.events.subscribe('teacher-profile-first-screen-submit-call', (formData) => {
      console.log(formData.country)
      if(!formData.country){
        this.isRequired = true;
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

  }


  async openCountrySelection() {
    const res = (await this.modals.present(
      ListCountryComponent)) as any;
    if (res.data) {

      const d = res.data;
      this.selectedCountry = d;
      this.onChange.emit(res.data);

    }
  }

  returnFlagCode(item){
    if(item && item.iso2){
      return item.iso2.toLowerCase();
    }
    return '';
  }

}
