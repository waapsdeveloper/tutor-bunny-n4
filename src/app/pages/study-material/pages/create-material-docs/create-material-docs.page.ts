import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateMaterialService } from '../create-material/create-material.service';

@Component({
  selector: 'app-create-material-docs',
  templateUrl: './create-material-docs.page.html',
  styleUrls: ['./create-material-docs.page.scss'],
})
export class CreateMaterialDocsPage extends BasePage implements OnInit {

  title = 'Study Material Documents';
  doc:null
  params;
  remainingSlots;

  images$: any[] = [];


  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService
  ) {
    super(injector);



  }

  ngOnInit() {
    this.initialize();
  }


  async initialize() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

    this.createMaterialService.getImages().subscribe( (data) => {
      this.images$ = data;
    });



  }

  setBackgroundImage(item) {
    return `url('${item.image}')`;
  }

  async addImageInArray(imageString) {

    let obj = {
      feature: false,
      image: imageString,
    };

    await this.createMaterialService.addImageInImages(obj);
  }


  async onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.remainingSlots = 8 - this.images$.length;

    if (this.remainingSlots <= 0) {
      alert('You have already uploaded the maximum of 8 images.');
      return;
    }

    const filesToUpload = files.slice(0, this.remainingSlots);

    console.log(filesToUpload);

    for (const file of filesToUpload) {
      let imageString: string;
      if (file.size > 1048576) {
        console.log(file.size);
        imageString = await this.imageService.resizeImage(file, 800, 800);
        console.log(imageString);
      } else {
        imageString = await this.fileToDataURL(file);
      }
      await this.addImageInArray(imageString);
    }
  }

  fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async updateFeatureImage(item: any, index, event: Event) {
    event.stopPropagation();

    for (let i = 0; i < this.images$.length; i++) {
      this.images$[i].feature = false;
    }

    this.images$[index].feature = true;

    this.createMaterialService.setImages(this.images$)
  }

  async clearImage(index: any, event: Event) {
    event.stopPropagation();
    console.log(event);

    this.createMaterialService.removeImageInImagesIndex(index)

  }

  openImage(image) {
    // this.nav.push('/course-profile/course-photo/gallery-image', {
    //   backUrl: '/course-profile/course-photo',
    //   image: image,
    // });
  }

}

