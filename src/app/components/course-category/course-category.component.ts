import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss'],
})
export class CourseCategoryComponent extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() { }
  async openCategory(){
    let res = await this.modals.present(CategoryListComponent);
    console.log(res);
    
  }

}
