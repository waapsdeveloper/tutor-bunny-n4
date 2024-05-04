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
  selectedState= { name: 'India', flag: '🇮🇳', code: 'IN', dial_code: '+91' };
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  constructor(private modals: ModalService) {}
  ngOnInit() {}
  async openCountrySelection() {
    const res = (await this.modals.present(
      StateListComponent,
      { list: this.list },
      '',
      0.75
    )) as any;
    console.log(res);
    if (res.data) {
      this.selectedState = res.data;
      this.onChange.emit(res.data);
    }
  }
  result($event){
    let v = $event.target.value;
    console.log(v);
    this.onChange.emit(v)
  }
}
