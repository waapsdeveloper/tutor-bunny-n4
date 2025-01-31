import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCourseService } from '../course-form/create-course.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-course-photoss',
  templateUrl: './course-photoss.page.html',
  styleUrls: ['./course-photoss.page.scss'],
})
export class CoursePhotossPage extends BasePage implements ViewWillEnter, OnDestroy {
  backBtn = '/course-profile/course-photo-edit';
  title = 'Course Photos';
  doc:null
  params;
  images$: any[] = [];
  courseId;
  remainingSlots;

  constructor(
    injector: Injector,
    public createCourseService: CreateCourseService
  ) {
    super(injector);

  }

  ionViewWillEnter() {
    this.initialize();
  }


  async initialize() {

    const d = await this.createCourseService.getFormDataAsync() as any;
    this.courseId = d.id;

    if(this.courseId && this.courseId !== -1){
      const res = await this.network.getMaterialImages({study_material_id: this.courseId}) as any;
      if(res.result){
        this.createCourseService.setImages(res.result)
      }
    }



  }
  setBackgroundImage(item) {
    return `url('${item.image}')`;
  }


  async addImageInArray(imageString) {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const courseId = this.createCourseService.courseId;

    // let obj = {
    //   user_id: user.id,
    //   course_id: courseId,
    //   image: imageString,
    // };

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
    let obj = {
      feature: false,
      image: imageString,
    };

    await this.createCourseService.addImageInImages(obj);
    }




  async onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.remainingSlots = 8 - this.createCourseService.coursePhotos.length;

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

  async updateFeatureImage(item: any, index, event: Event) {
    event.stopPropagation();

    for (let i = 0; i < this.createCourseService.coursePhotos.length; i++) {
      this.createCourseService.coursePhotos[i].feature = false;
    }

    this.createCourseService.coursePhotos[index].feature = true;

    const courseId = this.createCourseService.courseId;
    const img = item.image;
    this.createCourseService.formData.image = item.image;

    if (courseId) {
      let obj = {
        course_id: courseId,
        image: img,
      };
      await this.network.postCoursePhoto(obj);
    }
  }

  async clearImage(index: any, event: Event) {
    event.stopPropagation();
    this.createCourseService.removeImageInImagesIndex(index)

    // const coursePhotos = this.createCourseService.coursePhotos;
    // const courseId = this.createCourseService.courseId;
    // const pht = coursePhotos[index];
    // let image = coursePhotos[0].image;
    // this.events.publish('change-sample-course-to-this', image);

    // if (!pht) {
    //   return;
    // }




    // // Check if the photo being cleared is the feature image
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
  async clearImageB64(index: any, event: Event) {
    event.stopPropagation();
    this.createCourseService.base64ImagesArray.splice(index, 1);
  }

  openImage(image) {
    this.nav.push('/course-profile/course-photo/gallery-image', {
      backUrl: '/course-profile/course-photo',
      image: image,
    });
  }

  backToProfile() {
    this.nav.pop();
  }
  ngOnDestroy(): void {

    if(this.images$.length > 0){
      this.createCourseService.setImage(this.images$[0].image)
    }

    if(this.createCourseService.base64ImagesArray.length > 0){
      this.createCourseService.setImage(this.createCourseService.base64ImagesArray[0].image)
    }
  }
}
