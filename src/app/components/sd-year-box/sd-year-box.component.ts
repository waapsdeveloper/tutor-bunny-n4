import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalService } from 'src/app/services/basic/modal.service';
import { SelectYearComponent } from './select-year/select-year.component';

@Component({
  selector: 'app-sd-year-box',
  templateUrl: './sd-year-box.component.html',
  styleUrls: ['./sd-year-box.component.scss'],
})
export class SdYearBoxComponent implements OnInit, AfterViewInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() isReadOnly = false;
  @ViewChild('dob') dob: ElementRef;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modals: ModalService) {}

  ngAfterViewInit(): void {
    // Access the value of ion-datetime

  }

  ngOnInit() {

  }

  result($event) {
    let v = $event.target.value;
    // console.log("date-set", v)
    let m = moment(v).format('Y-MM-DD');
    // console.log(m);
    // if (!this.isReadOnly) {
    this.onChange.emit(m);
    // }
  }

  async openDateSelection() {
    const res = (await this.modals.present(
      SelectYearComponent)) as any;
    if (res.data) {

      console.log(res.data)
      const d = res.data;
      this.onChange.emit(res.data.name);

    }
  }
}
