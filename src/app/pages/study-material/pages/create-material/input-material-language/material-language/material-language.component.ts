import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { MaterialLanguageListComponent } from './material-language-list/material-language-list.component';

@Component({
  selector: 'app-material-language',
  templateUrl: './material-language.component.html',
  styleUrls: ['./material-language.component.scss'],
})
export class MaterialLanguageComponent extends BasePage implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  private _language;

  @Input()
  public set language(value: any) {
    this._language = value;
    if (value && value.name) {
      console.log(value);
      this.selectedLanguage = value;
    }
  }

  public get language(): any {
    return this._language
  }

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

    this.events.subscribe('teacher-study-material-first-screen-submit-call', (formData) => {
      if (!formData.language) {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false)

  }


  async openLanguageSelection() {

    console.log(this.language)
    let obj = {
      preSelectedLanguages: [this.language]
    }

    const res = (await this.modals.present(
      MaterialLanguageListComponent,
      obj
    )) as any;

    if (res && res.data && res.data.item) {

      this.selectedLanguage = res.data.item;
      this.onChange.emit(this.selectedLanguage);

    }
  }



}
