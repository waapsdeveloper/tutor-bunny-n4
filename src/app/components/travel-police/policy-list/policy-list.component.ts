import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss'],
})
export class PolicyListComponent extends BasePage implements OnInit {


  list = [];
  data;
  selectedItemId = 0;

  constructor(injector: Injector) {
    super(injector)

    this.initialize()
  }

  ngOnInit() { }

  async initialize() {
    this.data = await this.network.getTravelPolicy() as any[];

    this.list = this.data.result;


  }
  isListItemSelected() {
    return this.list.filter(x => x.checked == true).length > 0;
  }


  selectedCategory() {
    let item = this.list.find(x => x.id === this.selectedItemId);
    if (!item) {
      this.modals.dismiss();
    }
    this.modals.dismiss({
      item: item
    });
  }
  
  back(){
    this.modals.dismiss()
  }
}
