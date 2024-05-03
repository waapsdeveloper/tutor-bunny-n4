import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { LanguageListComponent } from '../sd-language-box/language-list/language-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';

@Component({
  selector: 'app-sd-subject-box',
  templateUrl: './sd-subject-box.component.html',
  styleUrls: ['./sd-subject-box.component.scss'],
})
export class SdSubjectBoxComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()
  // list = language;
  selectedLanguage = {code: 'en', name: 'English', nativeName:'English'  } ;


  constructor(private modals: ModalService) { }

  ngOnInit() { }

  async openSubjectSelection() {
    const res = (await this.modals.present(
      SubjectListComponent,
    )) as any;
    console.log(res);
    if (res.data) {
      console.log(res.data);
      this.onChange.emit(res.data);
    }
  }

}

