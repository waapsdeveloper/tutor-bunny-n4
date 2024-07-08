import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-sd-category-list',
  templateUrl: './sd-category-list.component.html',
  styleUrls: ['./sd-category-list.component.scss'],
})
export class SdCategoryListComponent extends BasePage implements OnInit {



  list = [];
  data;
  selectedItemId = 0;

  constructor(injector: Injector) {
    super(injector)

    this.initialize()
  }

  ngOnInit() { }

  async initialize() {
    this.data = await this.network.getCategory() as any[];

    this.list = this.data.result;
    console.log(this.list);
    

  }
  isListItemSelected() {
    return this.list.filter(x => x.checked == true).length > 0;
  }


  selectedCategory() {
    console.log(this.selectedItemId);
    // return
    let item = this.list.find(x => x.id === this.selectedItemId);
    console.log(item);
    

    if (!item) {
      // return;
      this.modals.dismiss();
    }

    this.modals.dismiss({
      item: item
    });
  }

}
