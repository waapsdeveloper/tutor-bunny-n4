import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateMaterialService } from '../create-material/create-material.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-create-material-photos',
  templateUrl: './create-material-photos.page.html',
  styleUrls: ['./create-material-photos.page.scss'],
})
export class CreateMaterialPhotosPage extends BasePage implements ViewWillEnter, OnDestroy {

  title = 'Study Material Photos';
  doc:null
  params;
  remainingSlots;
  images$: any[] = [];  
  materialId;


  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService
  ) {
    super(injector);

    this.createMaterialService.getImages().subscribe( (data) => {
      console.log("updates", data)
      this.images$ = data;
    });

  }

  ionViewWillEnter() {
    this.initialize();
  }


  async initialize() {

    const d = await this.createMaterialService.getFormDataAsync() as any;
    this.materialId = d.id;

    if(this.materialId && this.materialId !== -1){
      const res = await this.network.getMaterialImages({study_material_id: this.materialId}) as any;
      if(res.result){
        this.createMaterialService.setImages(res.result)
      }
    }







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



    for (const file of filesToUpload) {
      let imageString: string;
      if (file.size > 1048576) {

        imageString = await this.imageService.resizeImage(file, 800, 800);

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

  async clearImage(index: any, event: Event) {
    event.stopPropagation();
    this.createMaterialService.removeImageInImagesIndex(index)
  }

  async clearImageB64(index: any, event: Event) {
    event.stopPropagation();
    this.createMaterialService.base64ImagesArray.splice(index, 1);
  }

  openImage(image) {
    // this.nav.push('/course-profile/course-photo/gallery-image', {
    //   backUrl: '/course-profile/course-photo',
    //   image: image,
    // });
  }

  ngOnDestroy(): void {

    if(this.images$.length > 0){
      this.createMaterialService.setImage(this.images$[0].image)
    }

    if(this.createMaterialService.base64ImagesArray.length > 0){
      this.createMaterialService.setImage(this.createMaterialService.base64ImagesArray[0].image)
    }
  }

}

