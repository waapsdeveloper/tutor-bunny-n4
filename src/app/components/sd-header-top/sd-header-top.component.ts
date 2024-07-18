import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-sd-header-top',
  templateUrl: './sd-header-top.component.html',
  styleUrls: ['./sd-header-top.component.scss'],
})
export class SdHeaderTopComponent implements OnInit {
  @Input() showSearch: boolean = false;
  @Input() showFav: boolean = false;
  @Input() showNotification: boolean = false;
  @Input() showBack: boolean = false;
  @Input() showEdit: boolean = false;
  @Input() showShare: boolean = false;
  @Input() backUrl: string = '';
  @Input() title: string = '';
  

  @Input() parentHandleBack: boolean = false;

  @Output('parentBack') parentBack: EventEmitter<any> = new EventEmitter<any>();
  @Output('parentEdit') parentEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private nav: NavService) { }

  ngOnInit() { }

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
}
