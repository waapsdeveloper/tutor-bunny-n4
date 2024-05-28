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

  ngOnInit() { }


  async openLanguageSelection() {

    let obj = {
      preSelectedLanguage: this.language
    }

    const res = (await this.modals.present(
      CourseLanguageListComponent,
      obj
    )) as any;

    if (res && res.data && res.data.item) {

      // console.log(res.data)

      this.selectedLanguage = res.data.item;
      console.log(this.selectedLanguage);



      // this.language = res.data;

      // let user = JSON.parse(localStorage.getItem('user'));
      // let obj = {
      //   user_id: user.id,
      //   languages: this.language.map(x => x.id)
      // }

      // const res2 = await this.network.addLanguage(obj)
      // this.onChange.emit(res.data);
    }
  }

  async removeLanguage(item) {

    let index = this.language.findIndex(x => x.id == item.id);
    this.language.splice(index, 1);

    let user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
      language_id: item.id
    }

    const res2 = await this.network.removeMyLanguages(obj)
    this.onChange.emit(this.language);

  }

}
