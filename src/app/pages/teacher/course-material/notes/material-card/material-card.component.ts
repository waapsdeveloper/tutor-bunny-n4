import {
  Component,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardComponent extends BasePage implements OnInit {
  list;
  trials;

  created_at;
  updated_at;

  rating;
  total_rating;
  displayName;

  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;

    const created_at = value.created_at;
    this.created_at = created_at ? moment(created_at).format('DD-MMM-Y') : '';

    const updated_at = value.updated_at;
    this.updated_at = updated_at ? moment(updated_at).format('DD-MMM-Y') : '';

    this.initialize(value);
  }
  course;
  status;
  @Output() materialDeleted = new EventEmitter<number>();
  @Output() activeTab = new EventEmitter<number>();
  @Output() inActiveTab = new EventEmitter<number>();
  @Output() openDeatils = new EventEmitter<any>();
  @Output() courseEdit = new EventEmitter<any>();

  constructor(injector: Injector, private alertController: AlertController) {
    super(injector);
  }

  hostScreensize = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
  }

 
  ngOnInit() {
    this.status = this.item.status;
    this.updateColumnClass(window.innerWidth);
  }

  async initialize(data) {
    this.rating = data.user.teacher.avg_rating;
    this.total_rating = data.user.teacher.total_rating;
    this.displayName = this.utility.getAmericanName(this.item.user.name);
  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      header: 'Are you sure to delete the material?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteMaterial(item);
          },
        },
      ],
    });

    await alert.present();
  }

  setResult(ev) {}

  async deleteMaterial(data) {
    let obj = {
      study_material_id: data.id,
    };

    this.materialDeleted.emit(data);
    let res = await this.network.deleteMaterial(obj);
    // if (res.status === 200) {
    // }
  }

  async editCourse(item) {
    const params = {
      title: 'Edit Material',
      showBack: true,
      material_Id: item.id,
      edit: true,
    };///////

    this.nav.push('/create-material', params);
  }

  async inactiveCourse(data) {
    let obj = {
      material_id: data.id,
    };

    let res = await this.network.inactiveCourse(obj);
    if (res.status === 200) {
      this.item = res.course;
      this.status = this.item.status;
      this.inActiveTab.emit();
    }
  }

  async activeCourse(data) {
    let obj = {
      material_id: data.id,
    };

    let res = await this.network.activeCourse(obj);
    if (res.status === 200) {
      this.item = res.course;
      this.status = this.item.status;
      this.activeTab.emit();
    }
  }

  openClickDetail(){
    console.log("ret");
    this.openDeatils.emit(this.item)
  }
}
