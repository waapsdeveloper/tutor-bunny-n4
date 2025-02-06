import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-text-read',
  templateUrl: './global-text-read.component.html',
  styleUrls: ['./global-text-read.component.scss'],
})
export class GlobalTextReadComponent{

  isExpanded = false;

  @Input() heading: string;
  
  
  private _text: string;
  @Input()
  set text(value: string) {
    // this._text = value;
    this._text = value.replace(/\n/g, '<br>')
    // this.updateText(value);
  }

  get text(): string {
    return this._text;
  }



  constructor() { }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  updateText(value) {
    console.log(value);
    
    // this.text = value;
    }

}
