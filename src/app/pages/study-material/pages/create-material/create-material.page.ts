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


  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService
  ) {
    super(injector);
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

  async onSlideChange() {


    const data = await this.createMaterialService.getFormData();
    this.events.publish('teacher-study-material-first-screen-submit-call', data)

    console.log(data)

    if (!data.title || !data.description || !data.language || !data.price) {
      return;
    }

    this.step = 2;
    this.slides?.swiperRef?.slideTo(1, 500, false);



  }

  openPhotosView(){
    this.nav.push('/create-material-photos');
  }

  openDocssView(){
    this.nav.push('/create-material-photos');
  }






}
