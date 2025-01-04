import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
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
  params;
  backUrl = '';
  showBack;
  edit = false;
  loading = false;
  step = 1;

  material$;
  materialId;


  constructor(
    injector: Injector,
    private createMaterialService: CreateMaterialService,
    private globalStudyMaterialService: GlobalStudyMaterialService

  ) {
    super(injector);

    this.createMaterialService.getFormData().subscribe(data => {
      this.material$ = data;

    });

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.createMaterialService.reset();
  }

  async initialize() { }

  async ionViewWillEnter() {

    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.title) {
      this.title = this.params.title;
    }
    if (this.params.showBack) {
      this.showBack = this.params.showBack;
    }
    if (this.params.edit) {
      this.edit = this.params.edit;
    }

    if (this.params.material_Id) {
      this.materialId = this.params.material_Id;
      const res = await this.globalStudyMaterialService.getItemPromise(this.materialId);

      this.createMaterialService.setStateItem(res);

      // localStorage.setItem('courseId', this.courseId);

      // let res = (await this.network.getcourseById(this.courseId)) as any;
      // this.setFormDta(res.course);

      // // course images patch
      // this.createCourseService.courseId = this.courseId;
      // this.createCourseService.getCourseImages();
    }

  }

  shouldHandleBackToPrevScreen(event) {

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



    const res = (this.material$.id !- -1) ? await this.network.updateStudyMaterial(formData, this.material$.id) : await this.network.storeStudyMaterial(formData);


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
        //
        //   let obj = {
        //     "feature": false,
        //     "image": simage.result.image
        //   }
        //   this.createMaterialService.setImage(obj);
        // }

      }

      this.step = 2;
      this.slides?.swiperRef?.slideTo(1, 500, false);


      // this.sendPendingImages(studyMaterialId);

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


          if(res.result.id){

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
