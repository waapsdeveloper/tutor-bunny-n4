import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-error-input-info',
  templateUrl: './sd-error-input-info.component.html',
  styleUrls: ['./sd-error-input-info.component.scss'],
})
export class SdErrorInputInfoComponent  implements OnInit {

  @Input('errorText') errorText: string = '';
  constructor() { }

  ngOnInit() {}

}
