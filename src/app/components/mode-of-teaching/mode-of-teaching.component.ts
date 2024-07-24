import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-mode-of-teaching',
  templateUrl: './mode-of-teaching.component.html',
  styleUrls: ['./mode-of-teaching.component.scss'],
})
export class ModeOfTeachingComponent extends BasePage implements OnInit {
  @Input('errorText') errorText = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() mode = '';
  @Input() capacity = '';
  @Input() isReadOnly = false;
  @Input('key') key = '';
  @Input() minlength;
  @Input() maxlength;
  @Input('needed') needed = true;
  @Input() image = ''
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  isRequired = false;
  teachingMode = {
    mode: '',
    capacity: ''
  }
  constructor(injector: Injector) {
    super(injector)
  }
  ngOnInit() {

    this.events.subscribe("set-mode-and-capacity", (data) => {
      this.teachingMode.mode = data.mode_type;
      this.teachingMode.capacity = data.capacity;
    })




    this.events.subscribe('teacher-course-first-screen-submit-call', (formData) => {
      let v = formData[this.key];
      if (!this.teachingMode.capacity || this.teachingMode.capacity == '' || !this.teachingMode.mode || this.teachingMode.mode == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false)
  }


  toggleMode(mode: string) {
    this.teachingMode.mode = mode;
    this.onChange.emit(this.teachingMode);
  }
  toggleCapacity(capacity: string) {
    this.teachingMode.capacity = capacity;
    this.onChange.emit(this.teachingMode);
  }
}
