import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateMaterialService } from '../create-material/create-material.service';

@Component({
  selector: 'app-create-material-photos',
  templateUrl: './create-material-photos.page.html',
  styleUrls: ['./create-material-photos.page.scss'],
})
export class CreateMaterialPhotosPage extends BasePage implements OnInit {

  title = 'Course Photos';
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

    // this.createCourseService.coursePhotos.push(obj);

    // if (courseId) {
    //   obj.course_id = courseId;
    //   await this.network.postCourseImage(obj);
    // }

    // if (this.createCourseService.coursePhotos.length == 1) {
    //   this.createCourseService.coursePhotos[0].feature = true;
    //   this.createCourseService.formData.image = imageString;

    //   if (courseId) {
    //     let obj = {
    //       course_id: courseId,
    //       image: imageString,
    //     };
    //     await this.network.postCoursePhoto(obj);
    //   }
    // }
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

    // const courseId = this.createCourseService.courseId;
    // const img = item.image;
    // this.createCourseService.formData.image = item.image;

    // if (courseId) {
    //   let obj = {
    //     course_id: courseId,
    //     image: img,
    //   };
    //   await this.network.postCoursePhoto(obj);
    // }
  }

  async clearImage(index: any, event: Event) {
    event.stopPropagation();
    console.log(event);

    this.createMaterialService.removeImageInImagesIndex(index)




    // const coursePhotos = this.createCourseService.coursePhotos;
    // const courseId = this.createCourseService.courseId;
    // const pht = coursePhotos[index];
    // let image = coursePhotos[0].image;
    // this.events.publish('change-sample-course-to-this', image);

    // if (!pht) {
    //   return;
    // }




    // Check if the photo being cleared is the feature image
    // if (pht.feature) {
    //   // First, remove the image from the array
    //   if (pht.id) {
    //     await this.network.deleteCourseImage(pht.id);
    //   }

    //   coursePhotos.splice(index, 1);

    //   // Check if there are still photos in the array
    //   if (coursePhotos.length > 0) {
    //     // Set the first photo in the array as the feature image
    //     coursePhotos[0].feature = true;
    //     this.createCourseService.formData.image = coursePhotos[0].image;
    //     let image = coursePhotos[0].image;
    //     this.events.publish('change-sample-course-to-this', image);

    //     // Update the feature image on the server if courseId exists
    //     if (courseId) {
    //       let obj = {
    //         course_id: courseId,
    //         image: coursePhotos[0].image,
    //       };
    //       await this.network.postCoursePhoto(obj);
    //     }
    //   } else {
    //     // If no photos remain, reset the feature image
    //     this.createCourseService.formData.image = null;
    //   }
    // } else {
    //   // If the image being cleared is not the feature image, simply remove it
    //   if (pht.id) {
    //     await this.network.deleteCourseImage(pht.id);
    //   }
    //   coursePhotos.splice(index, 1);
    // }
  }

  openImage(image) {
    // this.nav.push('/course-profile/course-photo/gallery-image', {
    //   backUrl: '/course-profile/course-photo',
    //   image: image,
    // });
  }

}

