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
  @Input() type = 'text';
  @Input() placeholder = '';
  selectedFromAge = {
    from_age: '',
    to_age: ''
  }

  @Input() isReadOnly = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() { }

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
