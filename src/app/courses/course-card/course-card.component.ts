import { Component, EventEmitter, Injector, Input, OnInit, Output, output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent extends BasePage implements OnInit {
  list;
  @Input() item;
  course;
  status;
  @Output() courseDeleted = new EventEmitter<number>();

  constructor(injector: Injector, private alertController: AlertController) {
    super(injector)
    this.initialize()
  }

  ngOnInit() {
    console.log(this.item);

    this.status = this.item.status;
    console.log(this.status);
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
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteCourse(item);
            console.log('Alert confirmed');
          },
        },
      ],
    });

    await alert.present();
  }

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  async deleteCourse(data) {
    let obj = {
      course_id: data.id,
    };

    let res = await this.network.inactiveCourse(obj);
    if (res.status === 200) {
      this.courseDeleted.emit(data.id);
    }
  }

  editCourse(item) {
    const params = {
      backUrl: '/tabs/courses',
      title: 'Edit Course',
      type: item.type,
      showBack: true,
      course_Id: item.id,
      edit: true
    };

    this.nav.push('/course-form', params)

  }
  oepnDeatils(item) {

    const params = {
      id: item.id,
      backUrl: '/tabs/courses'
    }
    this.nav.push('/tabs/course-detail', params)



  }

  async inactiveCourse(data) {

    let obj = {
      course_id: data.id,
    }

    let res = await this.network.inactiveCourse(obj)
  }


  async activeCourse(data) {
    let obj = {
      course_id: data.id,
    }

    let res = await this.network.activeCourse(obj)
  }

}
