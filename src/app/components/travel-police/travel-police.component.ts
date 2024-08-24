import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { PolicyListComponent } from './policy-list/policy-list.component';

@Component({
  selector: 'app-travel-police',
  templateUrl: './travel-police.component.html',
  styleUrls: ['./travel-police.component.scss'],
})
export class TravelPoliceComponent extends BasePage implements OnInit {

  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  @Input() inputCategory;

  categury = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  private _travel_policy;

  @Input()
  public set travel_policy(value: any){
    this._travel_policy = value;
    if(value && value.name){
      console.log(value);

      this.selectedtravelpolicy = value;
    }

  }

  public get travel_policy(): any{
    return this._travel_policy
  }

  selectedtravelpolicy = {
    "created_at": null,
    "id": 3,
    "name": "",
    "updated_at": null
  };

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {
    this.events.subscribe('teacher-profile-third-screen-submit-call', (formData: any) => {

      let v = formData[this.key];
      if (!v || v == '') {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }
    }, false);
  }

  async openpolicy(){
    let res = await this.modals.present(PolicyListComponent) as any;

    if (res && res.data && res.data.item) {
      this.selectedtravelpolicy = res.data.item || this.selectedtravelpolicy;
      this.onChange.emit(this.selectedtravelpolicy);
    }
  }

}
