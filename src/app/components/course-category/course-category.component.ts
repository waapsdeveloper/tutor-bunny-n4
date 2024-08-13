import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SdCategoryListComponent } from './sd-category-list/sd-category-list.component';
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
  @Input() inputCategory;
  @Input() selectedCategory = {
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


  private _category;

  @Input()
  public set category(value: any) {

    this._category = value;
    if (value && value.name) {
      this.selectedCategory = value;

    }

  }

  public get category(): any {
    return this._category
  }

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {

    this.events.subscribe("set-form-course-category", (data) => {
      if (data && data.category) {
        this.selectedCategory = data.category;
      }
    });


    this.events.subscribe('teacher-course-second-screen-submit-call', (formData: any) => {
      console.log(formData);
      
      if (!formData.category) {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

      if (formData.category && !formData.category.name) {
        this.isRequired = true;
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false)
  }
  async openCategory() {
    let res = await this.modals.present(SdCategoryListComponent) as any;

    if (res && res.data && res.data.item) {
      this.selectedCategory = res.data.item || this.selectedCategory;
      this.onChange.emit(this.selectedCategory);
    }

  }

}
