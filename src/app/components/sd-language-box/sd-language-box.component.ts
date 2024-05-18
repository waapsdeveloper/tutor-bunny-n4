import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { LanguageListComponent } from './language-list/language-list.component';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sd-language-box',
  templateUrl: './sd-language-box.component.html',
  styleUrls: ['./sd-language-box.component.scss'],
})
export class SdLanguageBoxComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  lang = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>()

  constructor(private modals: ModalService, private network: NetworkService, private events: EventsService, private users: UsersService) { }

  async ngOnInit() {

    this.events.subscribe('teacher-profile-first-screen-submit-call', (formData: any) => {

      let v = formData[this.key];
      console.log(v)

      if(!v || v == ''){
        this.isRequired = true;
        setTimeout( () => {
          this.isRequired = false;
        }, 5000);
      }
    }, false);

    this.inputText = '';
    const user = this.users.getUser();

    let obj = {
      user_id: user.id
    }

    const res2 = await this.network.getMyLanguages(obj)
    this.lang = res2.result;
    this.onChange.emit(this.lang);
  }

  async openLanguageSelection() {

    const res = (await this.modals.present(
      LanguageListComponent,
    )) as any;

    console.log(res);

    if (res.data) {
      console.log(res.data);
      this.lang = res.data;

      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        languages: this.lang.map(x => x.id)
      }

      const res2 = await this.network.addLanguage(obj)
      console.log(res2);



      this.onChange.emit(res.data);
    }
  }

  async removeLanguage(item){

    console.log(item);
    let index = this.lang.findIndex(x => x.id == item.id);
    this.lang.splice(index, 1);

    let user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
      language_id: item.id
    }

    const res2 = await this.network.removeMyLanguages(obj)
    console.log(res2);

    this.onChange.emit(this.lang);

  }

}
