import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-text-read',
  templateUrl: './global-text-read.component.html',
  styleUrls: ['./global-text-read.component.scss'],
})
export class GlobalTextReadComponent{

  isExpanded = false;

  @Input() heading: string;
  @Input() text: string;

  constructor() { }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

}
