import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-button-golden',
  templateUrl: './sd-button-golden.component.html',
  styleUrls: ['./sd-button-golden.component.scss'],
})
export class SdButtonGoldenComponent implements OnInit {
  @Input() image: any = null;
  @Input() text: any = null;
  @Input() disabled: boolean = false;

  @Input() isShowLoader: boolean = false;

  constructor() {


  }

  ngOnInit() {}
}