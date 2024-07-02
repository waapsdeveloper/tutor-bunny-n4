import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { AgeListComponent } from './age-list/age-list.component';

@Component({
  selector: 'app-sd-age-boox',
  templateUrl: './sd-age-boox.component.html',
  styleUrls: ['./sd-age-boox.component.scss'],
})
export class SdAgeBooxComponent extends BasePage implements OnInit {
  @Input() from_age = '';
  @Input() to_age = '';
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() isReadOnly = false;
  @Input() minlength;
  @Input() maxlength;
  @Input('needed') needed = true;
  @Input() image = ''
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  selectedFromAge = {
    from_age: '',
    to_age: ''
  }
  isRequired = false;

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.events.subscribe('teacher-course-first-screen-submit-call', (formData) => {
      let v = formData[this.key];
      console.log(v, this.key)
      if (!v || v == 'age') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)
  }

  async openFromageSelection() {
    let res = await this.modals.present(AgeListComponent);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    if (res.data) {
      this.selectedFromAge.from_age = res.data.name;
      this.onChange.emit(this.selectedFromAge);
    }
  }

  async openToageSelection() {
    let res = await this.modals.present(AgeListComponent);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    if (res.data) {
      this.selectedFromAge.to_age = res.data.name;
      this.onChange.emit(this.selectedFromAge);
    }
  }

}
