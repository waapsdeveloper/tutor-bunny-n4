import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { IonContent, IonicSlides, ViewWillEnter } from '@ionic/angular';
import { CreateMaterialService } from 'src/app/pages/study-material/pages/create-material/create-material.service';
import { SwiperComponent } from 'swiper/angular';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.page.html',
  styleUrls: ['./create-material.page.scss'],
})
export class CreateMaterialPage extends BasePage implements OnInit, ViewWillEnter, OnDestroy {

  @ViewChild('slides', { static: false }) slides: SwiperComponent | null = null;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  title = 'Study materials';
  backUrl = '';
  loading = false;
  step = 1;

  material$;


  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService
  ) {
    super(injector);

    this.createMaterialService.getFormData().then(data => {
      this.material$ = data;
    });

  }

  ngOnInit() {
    console.log("material init")
  }

  ngOnDestroy(): void {
    this.createMaterialService.reset();
  }

  async initialize() { }

  async ionViewWillEnter() {

  }

  shouldHandleBackToPrevScreen(event) {
    console.log(event);
    // this.sameCourseEdit = event;
    if (this.step == 2) {
      this.step = 1;
      // this.edit = true;
      // this.courseId = this.createCourseService.courseId;
      this.slides?.swiperRef?.slideTo(0, 500, false);
    }

  }

  async onSlideChange() {

    const data = await this.createMaterialService.getFormDataAsync() as any;

    this.events.publish('teacher-study-material-first-screen-submit-call', data)

    if (!data.title || !data.description || !data.language_id || !data.price) {
      return;
    }

    if(!data.images || data.images.length == 0){
      return;
    }

    // submit study matreial form
    const user = this.users.getUser();

    let formData = {
      "user_id": user.id,
      "title": data.title,
      "description": data.description,
      "language_id": data.language_id,
      "price": data.price,
    }

    const res = await this.network.storeStudyMaterial(formData);

    console.log(res)
    let studyMaterialId = res.studyMaterial.id;

    if (studyMaterialId) {

      this.createMaterialService.setId(studyMaterialId);

      if(data.image['image']) {

        let obj = {
          study_material_id: studyMaterialId,
          image: data.image['image'],
        };

        let simage = await this.network.postStudyMaterialPhoto(obj);

        // if(simage.result.image){
        //   console.log(simage.result.image);
        //   let obj = {
        //     "feature": false,
        //     "image": simage.result.image
        //   }
        //   this.createMaterialService.setImage(obj);
        // }

      }



      this.sendPendingImages(studyMaterialId);

    }
    // this.createCourseService.courseId = courseId;
    // if (courseId) {
    //   let obj = {
    //     course_id: courseId,
    //     image: this.createCourseService.formData.image,
    //   };
    //   if (!this.createCourseService.formData.image.includes('https')) {
    //     let image = await this.network.postCoursePhoto(obj);
    //   }

    //   this.createCourseService.sendPendingImages(courseId);
    // }



    // this.step = 2;
    // this.slides?.swiperRef?.slideTo(1, 500, false);



  }

  async sendPendingImages(studyMaterialId) {

    const images = await this.createMaterialService.getImagesPromise() as any[];
    const id = await this.createMaterialService.getIdPromise();

    if(id == -1){
      return;
    }

    if(!images || images.length == 0){
      return;
    }

    for (var i = 0; i < images.length; i++) {

      let item = Object.assign({}, images[i]);
      const user = JSON.parse(localStorage.getItem('user'));

      if (id) {
        if (!item.id) {
          let obj = {
            user_id: user.id,
            study_material_id: id,
            image: item['image'],
          };

          const res = await this.network.postMaterialImage(obj);
          console.log(res);

          if(res.result.id){
            console.log(res.result.id);
            item.id = res.result.id;
            // item.image = res.result.image;
            this.createMaterialService.updateImageInImagesIndex(i, item);
          }

        }
      }
    }

  }



  submit() {

  }

  openPhotosView(){
    this.nav.push('/create-material-photos');
  }

  openDocssView(){
    this.nav.push('/create-material-docs');
  }






}
