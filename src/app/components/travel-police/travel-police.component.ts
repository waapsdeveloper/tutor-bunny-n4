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
  @Input() selectedtravelpolicy = {
    "created_at": null,
    "id": 3,
    "name": "",
    "updated_at": null
  };
  categury = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() { }

  async openpolicy(){
    let res = await this.modals.present(PolicyListComponent) as any;

    if (res && res.data && res.data.item) {
      this.selectedtravelpolicy = res.data.item || this.selectedtravelpolicy;
      this.onChange.emit(this.selectedtravelpolicy);
    }
  }

}
