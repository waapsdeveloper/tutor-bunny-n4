import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { IonContent, IonicSlides, ViewWillEnter } from '@ionic/angular';
import { CreateMaterialService } from 'src/app/services/create-material.service';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.page.html',
  styleUrls: ['./create-material.page.scss'],
})
export class CreateMaterialPage extends BasePage implements OnInit, ViewWillEnter {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  hideTerms = false;
  backUrl;
  lang;
  showBack;
  title;
  params;
  studyMaterialId;
  edit = false;
  languageId
  step = 1;
  currency;
  sameMaterialEdit=false;
  loading = false;
  formData: any = {
    name: null,
    country: null,
    state: null,
    doc:null,
    dial_code: null,
    phone_number: null,
    city: null,
    zip_code: null,
    languages: null,
    subjects: null,
    title: null,
    description: null,
    terms: true,
    image: null,
    hourly_rate: null,
    photo_id: null,
    qualification_description: null,
    certificate: null,
    started_teaching: null,
    experience_description: null,
    travel_policy: null,
  };
  

  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService
  ) {
    super(injector);
  }

  ngOnInit() {
    console.log("material init")
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

    if (this.params.course_Id) {
      this.studyMaterialId = this.params.study_material_id;
      localStorage.setItem('courseId', this.studyMaterialId);

      // let res = (await this.network.getcourseById(this.courseId)) as any;
      // this.setFormDta(res.course);

      // // course images patch
      // this.createMaterialService.courseId = this.courseId;
      // this.createMaterialService.getCourseImages();
    }
  }

  result(value, key) {
    this.createMaterialService.formData[key] = value;
    if (key == 'image') {
      this.createMaterialService.formData['image'] = value.image;
    } else if (key == 'language') {
      this.lang = value;

      this.createMaterialService.formData['language'] = value;
      this.createMaterialService.formData['language_id'] = this.lang.id;
    }
  }

  async submit() {
    this.events.publish(
      'teacher-course-second-screen-submit-call',
      this.createMaterialService.formData
    );
    let f = this.createMaterialService.formData;
    if (!f.category || !f.price || !f.duration || !f.lesson || !f.keyword) {
      return;
    }
    if (f.keyword.length == 0) {
      return;
    }
    const course_id = this.createMaterialService.materialId;
    if (f.category && f.category.id) {
      f.category_id = f.category.id;
    }
    this.loading = true;

    const res = await this.network.SubmitSecondCourse(f, course_id);
    if (res && res.message) {
      if (this.edit && this.sameMaterialEdit) {
        this.utility.presentSuccessToast("Course Saved Successfully ");
      } else {
        this.utility.presentSuccessToast("Course Saved Successfully");
      }
    }

    // if (res && res.message) {
    //   this.loading = false;

    //   const message = !this.edit
    //     ? 'Course created successfully'
    //     : 'Course Updated Successfully';
    //   this.utility.presentSuccessToast(message);
    // }
    this.createMaterialService.resetFormData()
    this.nav.pop('/tabs/courses');
    this.events.publish('initilize-the-list', res);
  }


  
  async onSlideChange() {
    this.events.publish(
      'teacher-study-material-first-screen-submit-call',
      this.createMaterialService.formData
    );


  }
  setFormDta(data) {
    this.createMaterialService.setFormData(data);
    const lang = data['language'];
    if (lang) {
      this.languageId = lang.id;
    }
    this.events.publish('set-mode-and-capacity', data);
    this.events.publish('set-from-and-to-age', data);
    this.events.publish('set-form-course-image', data);
  }
  openMaterialPhotos(){
    this.nav.push('/course-photoss', {
      backUrl: '/material-form',
      gallary: 'true',
      title: 'Upload materials Photo',
      
    });
  }
  openMaterialDoc(){
    this.nav.push('/course-photoss', {
      backUrl: '/material-form',
      gallary: 'true',
      title: 'Upload materials Document',
      
    });
  }

}
