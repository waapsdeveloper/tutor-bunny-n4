import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateMaterialService } from '../create-material/create-material.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-create-material-photos',
  templateUrl: './create-material-photos.page.html',
  styleUrls: ['./create-material-photos.page.scss'],
})
export class CreateMaterialPhotosPage extends BasePage implements OnInit, OnDestroy {

  title = 'Study Material Photos';
  doc:null
  params;
  remainingSlots;
  images$: any[] = [];
  studyMaterialId$;


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
    console.log(this.params)

    this.createMaterialService.getId().subscribe((data) => {
      this.studyMaterialId$ = data;
    });

    this.createMaterialService.getImages().subscribe( (data) => {
      this.images$ = data;
    });



    // const d = await this.createMaterialService.getFormDataAsync() as any;
    // this.materialId = d.id;

    // if(this.materialId && this.materialId !== -1){
    //   const res = await this.network.getMaterialImages({study_material_id: this.materialId}) as any;
    //   if(res.result){
    //     this.createMaterialService.setImages(res.result)
    //   }
    // }







  }

  setBackgroundImage(item) {
    return `url('${item.image}')`;
  }

  async addImageInArray(imageString, type) {

    let obj = {
      feature: false,
      image: imageString,
      type: type
    };

    await this.createMaterialService.addImageInImages(obj);

  }


  async onFileSelected(event: any) {

    const user = this.users.getUser();

    const files: File[] = Array.from(event.target.files);
    this.remainingSlots = 8 - this.images$.length;

    if (this.remainingSlots <= 0) {
      alert('You have already uploaded the maximum of 8 images.');
      return;
    }

    const filesToUpload = files.slice(0, this.remainingSlots);



    for (const file of filesToUpload) {
      const fileType = file.type;
      let imageString: string;
      if (file.size > 1048576) {
        imageString = await this.imageService.resizeImage(file, 800, 800);
      } else {


        const data = new FormData();
        data.append('image', file);
        data.append('file_type', fileType);
        data.append('study_material_id', this.studyMaterialId$);

        const res = await this.network.uploadStudtMaterialImage(data)
        if(res.bool == true){
          let imageString = res.result.data;
          await this.addImageInArray(imageString, fileType)
        }

      }
      
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
  }

}

