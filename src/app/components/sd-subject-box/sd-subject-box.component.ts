import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { LanguageListComponent } from '../sd-language-box/language-list/language-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-sd-subject-box',
  templateUrl: './sd-subject-box.component.html',
  styleUrls: ['./sd-subject-box.component.scss'],
})
export class SdSubjectBoxComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private network: NetworkService) { }

  ngOnInit() { }

  // async openSubjectSelection() {
  //   const res = (await this.modals.present(
  //     SubjectListComponent,
  //   )) as any;
  //   console.log(res);
  //   if (res.data) {
  //     console.log(res.data);
  //     this.onChange.emit(res.data);
  //   }
  // }

  async addSubject(){
    console.log(this.inputText)

    let user = JSON.parse(localStorage.getItem('user'));

    if(this.inputText){
      let obj = {
        user_id: user.id,
        name: this.inputText
      }
      const res = await this.network.addSubject(obj)
      console.log(res);

      const res2 = await this.network.getMySubjects(obj)
      console.log(res2);


      this.inputText = '';


      this.onChange.emit(res2.result);
    }
  }


}

