import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-material-photos',
  templateUrl: './material-photos.component.html',
  styleUrls: ['./material-photos.component.scss'],
})
export class MaterialPhotosComponent implements OnInit {
  private _materialId: any;
  materialImages: any[] = [];


  activeIndex = 0;
  @ViewChild('slides', { static: false }) slides: SwiperComponent;


  @Input()
  public get materialId() {
    return this._materialId;
  }
  public set materialId(value: any) {
    this._materialId = value;
    if (value) {
      this.getMaterialImages(value);
    }
  }

  constructor(public network: NetworkService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {

  }

  async getMaterialImages(id) {
    let obj = {
      study_material_id: id,
    };
    let res = (await this.network.getMaterialImages(obj)) as any;
    this.materialImages = res.result;

  }


  get svgWidth(): number {
    return this.materialImages.length * 10 + 8; // Dynamic width based on the number of circles
  }

  get viewBox(): string {
    return `0 0 ${this.svgWidth} 16`; // Dynamic viewBox to match the SVG's width
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;

    this.cdr.detectChanges();
  }
}
