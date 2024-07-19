import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-sd-header-top',
  templateUrl: './sd-header-top.component.html',
  styleUrls: ['./sd-header-top.component.scss'],
})
export class SdHeaderTopComponent extends BasePage implements OnInit {
  @Input() showSearch: boolean = false;
  @Input() showFav: boolean = false;
  @Input() showNotification: boolean = false;
  @Input() showBack: boolean = false;
  @Input() showEdit: boolean = false;
  @Input() showShare: boolean = false;
  @Input() backUrl: string = '';
  @Input() title: string = '';
  isfav= false;
  fav;
  @Input() parentHandleBack: boolean = false;

  @Output('parentBack') parentBack: EventEmitter<any> = new EventEmitter<any>();
  @Output('parentEdit') parentEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.events.subscribe('add-to-fav-from-detail', async (item: any) => {
      console.log("hogaya");

      this.fav = item;
      console.log(this.fav);

      this.isfav = this.fav.is_liked_by_me;
      
    })
  }

  back() {

    if (this.parentHandleBack) {
      this.parentBack.emit();
    } else {
      this.nav.pop(this.backUrl);
    }

  }

  editCourse() {
    this.parentEdit.emit()
  }

  goToNotificatioon() {
    this.nav.push('notifications', {
      backUrl: '/tabs/menu', showBack: true
    })
  }
  async addtoFav() {
    console.log("fdds");

      console.log("hogaya");
      // return
      let user = this.users.getUser()
      let obj = {
        user_id: user.id,
        course_id: this.fav.id
      }
      const res = await this.network.addCourseFav(obj)

      this.events.publish('update-fav-dot-d')



  }
}
