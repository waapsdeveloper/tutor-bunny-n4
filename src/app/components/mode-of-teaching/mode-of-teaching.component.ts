import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-mode-of-teaching',
  templateUrl: './mode-of-teaching.component.html',
  styleUrls: ['./mode-of-teaching.component.scss'],
})
export class ModeOfTeachingComponent extends BasePage implements OnInit {
  @Input('errorText') errorText = '';
  isRequired = false;
  teachingMode = {
    mode: '',
    capacity: ''
  }

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.events.subscribe('teacher-course-first-screen-submit-call', (formData: any) => {

      if (!formData.mode_type) {
        this.isRequired = true;
        this.errorText = 'Image is required to upload'
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
