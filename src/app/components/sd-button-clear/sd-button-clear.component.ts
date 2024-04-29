import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-button-clear',
  templateUrl: './sd-button-clear.component.html',
  styleUrls: ['./sd-button-clear.component.scss'],
})
export class SdButtonClearComponent implements OnInit {
  @Input() image: any = null;
  @Input() text: any = null;

  constructor() {}

  ngOnInit() {}
}
