import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
// import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss'],
})
export class CourseCategoryComponent extends BasePage implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  categury = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() { }
  async openCategory(){
    // let res = await this.modals.present(CategoryListComponent);
    // console.log(res);
    
  }

}
