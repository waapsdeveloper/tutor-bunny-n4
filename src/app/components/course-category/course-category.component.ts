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
  categury = [];
  @Input('key') key = '';
  @Input('errorText') errorText = '';
  isRequired = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  selectedCategory = {
    "created_at": null,
    "id": 3,
    "name": "",
    "updated_at": null
  };
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {

    this.events.subscribe('teacher-course-second-screen-submit-call', (formData: any) => {

      if (!formData.image) {
        this.isRequired = true;
        this.errorText = 'Image is required to upload'
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      } else if (!formData.photo_id) {
        this.isRequired = true;
        this.errorText = 'Photo ID is required to upload'
        setTimeout(() => {
          this.isRequired = false;
        }, 5000);
      }

    }, false)
  }
  async openCategory() {
    let res = await this.modals.present(SdCategoryListComponent) as any;
    if (res && res.data && res.data.item) {

      this.selectedCategory = res.data.item;
      this.onChange.emit(this.selectedCategory);

    }
  }

}
