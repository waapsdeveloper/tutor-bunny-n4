import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { LanguageListComponent } from './language-list/language-list.component';

@Component({
  selector: 'app-sd-language-box',
  templateUrl: './sd-language-box.component.html',
  styleUrls: ['./sd-language-box.component.scss'],
})
export class SdLanguageBoxComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  // list = language;
  selectedLanguage = {code: 'en', name: 'English', nativeName:'English'  } ;


  constructor(private modals: ModalService) { }

  ngOnInit() { }

  async openLanguageSelection() {

    const res = (await this.modals.present(
      LanguageListComponent,
    )) as any;

    console.log(res);

    if (res.data) {
      console.log(res.data);
      this.onChange.emit(res.data);
    }
  }

}
