import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalService } from 'src/app/services/basic/modal.service';
import { SelectYearComponent } from './select-year/select-year.component';
import { EventsService } from 'src/app/services/events.service';

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
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  @Input('needed') needed = true;

  isRequired = false;
  @ViewChild('dob') dob: ElementRef;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private modals: ModalService, private events: EventsService) { }

  ngAfterViewInit(): void {
    // Access the value of ion-datetime

  }

  ngOnInit() {

    this.events.subscribe('student-profile-first-screen-submit-call', (formData: any) => {

      let v = formData[this.key];
      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false)

  }

  result($event) {
    let v = $event.target.value;
    let m = moment(v).format('Y-MM-DD');
    this.onChange.emit(m);
  }

  async openDateSelection() {
    const res = (await this.modals.present(
      SelectYearComponent)) as any;
    if (res.data) {
      const d = res.data;
      this.onChange.emit(res.data.name);

    }
  }
}
