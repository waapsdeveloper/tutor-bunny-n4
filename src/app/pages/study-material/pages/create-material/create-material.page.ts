import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { IonContent, IonicSlides, ViewWillEnter } from '@ionic/angular';
import { CreateMaterialService } from 'src/app/pages/study-material/pages/create-material/create-material.service';
import { SwiperComponent } from 'swiper/angular';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.page.html',
  styleUrls: ['./create-material.page.scss'],
})
export class CreateMaterialPage extends BasePage implements OnInit, ViewWillEnter {

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

  async initialize() { }

  async ionViewWillEnter() {

  }

  async onSlideChange() {
    const data = await this.createMaterialService.getFormData();
    console.log("slide change", data);



  }




}
