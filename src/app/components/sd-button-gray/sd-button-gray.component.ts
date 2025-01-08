import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-button-gray',
  templateUrl: './sd-button-gray.component.html',
  styleUrls: ['./sd-button-gray.component.scss'],
})
export class SdButtonGrayComponent implements OnInit {
  @Input() image: any = null;
  @Input() text: any = null;
  @Input() disabled: boolean = false;

  @Input() isShowLoader: boolean = false;

  constructor() {


  }

  ngOnInit() {}
}
