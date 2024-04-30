import { Component, Input, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-sd-header-top',
  templateUrl: './sd-header-top.component.html',
  styleUrls: ['./sd-header-top.component.scss'],
})
export class SdHeaderTopComponent implements OnInit {
  @Input() showSearch: boolean = false;
  @Input() showNotification: boolean = false;
  @Input() showBack: boolean = false;
  @Input() backUrl: string = '';
  @Input() title: string = '';
  constructor(private nav: NavService) {}

  ngOnInit() {}

  back() {
    this.nav.pop(this.backUrl);
  }
}
