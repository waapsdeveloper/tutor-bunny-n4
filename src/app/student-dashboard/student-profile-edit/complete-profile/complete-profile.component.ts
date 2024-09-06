import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent extends BasePage implements OnInit {

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {}

  done(){
    this.modals.dismiss()
  }

}
