import { Component, EventEmitter, Injector, Input, OnInit, Output, output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent extends BasePage implements OnInit {
  list;
  trials;

  created_at;
  updated_at;
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    console.log(value);
    const created_at = value.created_at;
    this.created_at = created_at ? moment(created_at).format('DD-MMM-Y') : '';

    const updated_at = value.updated_at;
    this.updated_at = updated_at ? moment(updated_at).format('DD-MMM-Y') : '';
  }
  course;
  status;
  @Output() courseDeleted = new EventEmitter<number>();
  @Output() activeTab = new EventEmitter<number>();
  @Output() inActiveTab = new EventEmitter<number>();
  @Output() detailsAction = new EventEmitter<any>();
  @Output() courseEdit = new EventEmitter<any>();

  constructor(injector: Injector, private alertController: AlertController) {
    super(injector)
    this.initialize()
  }

  ngOnInit() {
    this.status = this.item.status;
  }

  async initialize() {

  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      header: 'Are you sure to delete the course?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteCourse(item);
          },
        },
      ],
    });

    await alert.present();
  }

  setResult(ev) {
  }

  async deleteCourse(data) {
    let obj = {
      course_id: data.id,
    };

    let res = await this.network.deleteCourse(obj);
    if (res.status === 200) {
      this.courseDeleted.emit(data.id);
    }
  }

  async editCourse(item) {
    const params = {
      backUrl: '/tabs/courses',
      title: 'Edit Course',
      type: item.type,
      showBack: true,
      course_Id: item.id,
      edit: true
    };

    let res = await this.nav.push('/course-form', params)

    this.courseEdit.emit(item.id);

  }
  oepnDeatils(item) {

    this.detailsAction.emit({
      id: item.id
    })

  }

  async inactiveCourse(data) {

    let obj = {
      course_id: data.id,
    }

    let res = await this.network.inactiveCourse(obj)
    if (res.status === 200) {
      this.item = res.course;
      this.status = this.item.status;
      this.inActiveTab.emit();
    }

  }


  async activeCourse(data) {
    let obj = {
      course_id: data.id,
    }

    let res = await this.network.activeCourse(obj)
    if (res.status === 200) {
      this.item = res.course;
      this.status = this.item.status;
      this.activeTab.emit();
    }
  }

}
