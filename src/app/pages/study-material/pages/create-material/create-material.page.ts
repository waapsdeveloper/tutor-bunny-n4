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

      const resImages = await this.network.getMaterialImages({
        study_material_id: this.materialId,
      });

      this.createMaterialService.setImages(resImages.result);

      if(resImages?.result?.length > 0){
        this.createMaterialService.setImage(resImages.result[0].image);
      }

      const resDocs = await this.network.getMaterialDocs({
        study_material_id: this.materialId,
      });

      this.createMaterialService.setDocs(resDocs?.result?.data || []);


      // get keywords from API
      let obj = {
        study_material_id: this.materialId
      }
      const res2 = await this.network.getMaterialKeyword(obj);
      console.log(res2);
      if(res2.result){
        this.createMaterialService.setKeywords(res2.result)
      }





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
      this.loading = false;
    }

  }

  async submitFIrstPartForm(data): Promise<any>{

    // submit study matreial form
    const user = this.users.getUser();

    let formData = {
      "user_id": user.id,
      "title": data.title,
      "description": data.description,
      "language_id": data.language_id,
      "price": parseInt(data.price),
    }



    const res = (this.material$.id !- -1) ? await this.network.updateStudyMaterial(formData, this.material$.id) : await this.network.storeStudyMaterial(formData);

    let studyMaterialId = res.studyMaterial.id;

    if (studyMaterialId) {
      this.createMaterialService.setId(studyMaterialId);
    }
    return res;

  }

  extractAndFormatImageName(url: string) {
    // Remove query parameters
    const cleanUrl = url.split('?')[0];
    return cleanUrl;

    // Extract filename from /images/ until the extension
    // const match = cleanUrl.match(/\/images\/([^\/]+?\.(jpg|png|jpeg|gif|webp))/i);

    // return match ? match[1].replace(/-/g, '') : null;
  }

  async onSlideChange() {

    const data = await this.createMaterialService.getFormDataAsync() as any;

    this.events.publish('teacher-study-material-first-screen-submit-call', data)

    if (!data.title || !data.description || !data.language_id || !data.price) {
      return;
    }

    if(data.description && data.description.length < 250){
      return;
    }

    if(!data.images || data.images.length == 0){
      return;
    }

    this.loading = true;

    // submit study matreial form
    const user = this.users.getUser();

    let formData = {
      "user_id": user.id,
      "title": data.title,
      "description": data.description,
      "language_id": data.language_id,
      "price": parseInt(data.price),
    }



    const res = (this.material$.id !- -1) ? await this.network.updateStudyMaterial(formData, this.material$.id) : await this.network.storeStudyMaterial(formData);


    let studyMaterialId = res.studyMaterial.id;

    if (studyMaterialId) {

      this.createMaterialService.setId(studyMaterialId);

      const mainImage = await this.createMaterialService.getImagePromise();

      if(mainImage) {

        console.log(mainImage)

        const cleanUrl = this.extractAndFormatImageName(mainImage as string);
        console.log(cleanUrl);

        let obj = {
          study_material_id: studyMaterialId,
          image: cleanUrl,
        };

        let res = await this.network.postStudyMaterialPhoto(obj);
        console.log("retwe", res);
        if(res && res.result){
          this.createMaterialService.setImage(res?.result?.image || "" )
        }



      //   // if(simage.result.image){
      //   //
      //   //   let obj = {
      //   //     "feature": false,
      //   //     "image": simage.result.image
      //   //   }
      //   //   this.createMaterialService.setImage(obj);
      //   // }

      }




      // await this.sendPendingImages(studyMaterialId);

      this.step = 2;
      this.slides?.swiperRef?.slideTo(1, 500, false);

      this.loading = false;

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

    var postImages = [];

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
          postImages.push(res.result);
        }
      }
    }

    console.log(postImages);
    // this.createMaterialService.setImages(postImages);

  }





  async submit() {

    const data = await this.createMaterialService.getFormDataAsync() as any;
    this.events.publish('teacher-study-material-second-screen-submit-call', data);
    console.log(data);

    if (!data.terms || !data.keywords || data.keywords.length == 0 || !data.docs || data.docs.length == 0 ) {
      return;
    }

    if(this.material$.id == -1){
      return;
    }

    // submit study matreial form
    const user = this.users.getUser();

    let formData = {
      "terms": data.terms,
    }

    const res = await this.network.submitSecondMaterial(formData, this.material$.id);

    this.globalStudyMaterialService.getMyStudyMaterialFromApi(1, '');

    this.nav.push('/tabs/course-material/notes');



  }

  async openPhotosView(){

    const data = await this.createMaterialService.getFormDataAsync() as any;
    await this.submitFIrstPartForm(data);

    this.nav.push('/create-material-photos');
  }

  openDocssView(){
    this.nav.push('/create-material-docs');
  }






}
