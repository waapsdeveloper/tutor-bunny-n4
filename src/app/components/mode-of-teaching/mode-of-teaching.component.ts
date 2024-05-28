import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mode-of-teaching',
  templateUrl: './mode-of-teaching.component.html',
  styleUrls: ['./mode-of-teaching.component.scss'],
})
export class ModeOfTeachingComponent  implements OnInit {
  isOnlineMode = true;
  isGroup = true;
  constructor() { }

  ngOnInit() {}
  toggleMode() {
    this.isOnlineMode = !this.isOnlineMode;
  }
  toggleCapacity() {
    this.isGroup = !this.isGroup;
  }
}
