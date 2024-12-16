import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class CreateMaterialService {
  materialId = null;

  materialPhotos = [];

  formData: any = {
    title: null,
    description: null,
    language: null,
    image: null,
    price: null,
    type: null,
    keyword: null,
  };

  constructor(private network: NetworkService, private events: EventsService) {
    this.events.subscribe('clear-all-services-data', () => {
      this.resetFormData();
    }, false);
  }

  resetFormData() {
    this.materialId = null;
    this.materialPhotos = [];
    this.formData = {
      title: null,
      description: null,
      language: null,
      image: null,
      price: null,
      type: null,
      keyword: null,
    };
  }

  setFormData(data) {
    console.log(data);

    this.formData['title'] = data['title'];
    this.formData['description'] = data['description'];
    this.formData['language_id'] = data['language_id'];
    this.formData['price'] = data['price'];
    this.formData['image'] = data['image'];
    this.formData['language'] = data['language'];
    this.formData['keyword'] = data['keywords'];
    const lang = data['language'];
    if (lang) {
      this.formData['language_id'] = lang.id;
    }
  }

  async getMaterialImages() {
    if (this.materialId) {
      let obj = {
        course_id: this.materialId,
      };

      const res = (await this.network.getCourseImages(obj)) as any;
      this.materialPhotos = res.result;
      console.log(this.materialPhotos);

      this.formData.image = this.materialPhotos[0].image

    }
  }

  async sendPendingImages(materialId) {
    for (var i = 0; i < this.materialPhotos.length; i++) {
      const item = Object.assign({}, this.materialPhotos[i]);
      const user = JSON.parse(localStorage.getItem('user'));

      if (!item.course_id && materialId) {
        if (!item.image.includes('https')) {
          let obj = {
            user_id: user.id,
            course_id: materialId,
            image: item['image'],
          };

          if (materialId) {
            obj.course_id = materialId;
            await this.network.postCourseImage(obj);
          }
        }
      }
    }

    this.getMaterialImages();
  }
}
