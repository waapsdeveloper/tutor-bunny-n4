import { Component, Injector, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  @Input() item: any;
  fav = false;
  trail = false;
  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
        this.setResult()
      }
    },
    {
      text: 'OK',
      handler: () => {
        console.log('OK clicked');
        this.handleOkClick();
      }
    }
  ];
  languageName: any;

  constructor(injector: Injector,private alertController: AlertController) {
    super(injector)
    this.initialize();
  }

  initialize() {

  }

  ngOnInit() { }
  goToDeatil(item) {
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard'
    }
    console.log(params);
    this.nav.push('student-course-detail', params)
  }
  requestTrail() {
    this.trail = true;
  }
  addToFav(){
    this.fav = true;
  }
  RemoveToFav(){
    this.fav = false;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cancel Trial Request',
      message: 'Are you sure to cancel trail Request',
      buttons: this.alertButtons
    });

    await alert.present();
  }

  setResult() {
    console.log('Alert dismissed with role:');
    this.trail = false;
  }

  handleOkClick() {
    // Handle the OK click here
    console.log('Handling OK click');
    this.trail = true;
  }
 
}
