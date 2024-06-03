import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CourseLanguageListComponent } from './course-language-list/course-language-list.component';

@Component({
  selector: 'app-course-language',
  templateUrl: './course-language.component.html',
  styleUrls: ['./course-language.component.scss'],
})
export class CourseLanguageComponent extends BasePage implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  language = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  selectedLanguage = {
    "created_at": null,
    "id": 3,
    "name": "",
    "updated_at": null
  };

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.events.subscribe('teacher-course-first-screen-submit-call', (formData) => {
      if(!formData.country){
        this.isRequired = true;
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

  }


  async openLanguageSelection() {

    let obj = {
      preSelectedLanguage: this.language
    }

    const res = (await this.modals.present(
      CourseLanguageListComponent,
      obj
    )) as any;

    if (res && res.data && res.data.item) {

      this.selectedLanguage = res.data.item;
      console.log(this.selectedLanguage);
      this.onChange.emit(this.selectedLanguage);
    }
  }



}
