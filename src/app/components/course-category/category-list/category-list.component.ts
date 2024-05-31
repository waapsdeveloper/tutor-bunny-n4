import { Component, Injector, OnInit } from '@angular/core';
import { initializeAuth } from 'firebase/auth';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent extends BasePage implements OnInit {

  list = [];
  selectedItemId = 0;

  constructor(injector: Injector) {
    super(injector)

    this.initialize()
  }

  ngOnInit() { }

  initialize() {
    let res = this.network.getCategory()
    console.log(res);

  }
  selectedCategory() {
    let item = this.list.find(x => x.id === this.selectedItemId);
    console.log(item);

    if (!item) {
      this.modals.dismiss();
      return;
    }

    this.modals.dismiss({
      item: item
    });
  }

}
