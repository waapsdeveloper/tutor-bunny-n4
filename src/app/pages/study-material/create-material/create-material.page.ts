import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { IonContent, IonicSlides, ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.page.html',
  styleUrls: ['./create-material.page.scss'],
})
export class CreateMaterialPage extends BasePage implements OnInit, ViewWillEnter {

  swiperModules = [IonicSlides];
  @ViewChild('slides', { static: false }) slides: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  backUrl;
  lang;
  showBack;
  title;
  params;
  studyMaterialId;
  edit = false;
  step = 1;
  currency;

  constructor(injector: Injector,) {
    super(injector);
  }

  ngOnInit() { }

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
      // this.createCourseService.courseId = this.courseId;
      // this.createCourseService.getCourseImages();
    }
  }

  async submit() {

  }

}
