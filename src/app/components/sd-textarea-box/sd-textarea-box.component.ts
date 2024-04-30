import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sd-textarea-box',
  templateUrl: './sd-textarea-box.component.html',
  styleUrls: ['./sd-textarea-box.component.scss'],
})
export class SdTextareaBoxComponent  implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputText = '';
  constructor() { }

  ngOnInit() {}

}
