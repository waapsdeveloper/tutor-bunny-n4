import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-textarea-about',
  templateUrl: './sd-textarea-about.component.html',
  styleUrls: ['./sd-textarea-about.component.scss'],
})
export class SdTextareaAboutComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  constructor() { }

  ngOnInit() {}

}
