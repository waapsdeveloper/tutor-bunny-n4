import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { StateListComponent } from './state-list/state-list.component';

@Component({
  selector: 'app-sd-state-box',
  templateUrl: './sd-state-box.component.html',
  styleUrls: ['./sd-state-box.component.scss'],
})
export class SdStateBoxComponent  implements OnInit {
  list ;
  selectedState = {
    id: 0,
    name: null
  };
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';

  private _countryId;
  // @Input('countryId') countryId: string;
  @Input()
  public get countryId(): number {
    return this._countryId;
  }

  public set countryId(value: number){
    this._countryId = value;
    this.selectedState = {
      id: 0,
      name: null
    };

  }


  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor(private modals: ModalService) {

  }
  ngOnInit() {

  }
  async openStateSelection() {

    const res = (await this.modals.present(
      StateListComponent,
      { countryId: this.countryId },
    )) as any;
    console.log(res);
    if (res.data) {
      this.selectedState = res.data;
      this.onChange.emit(res.data);
    }
  }
  result($event){
    let v = $event.target.value;
    this.onChange.emit(v)
  }

}
