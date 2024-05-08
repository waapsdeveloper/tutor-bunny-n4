import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accept-terms-profile',
  templateUrl: './accept-terms-profile.component.html',
  styleUrls: ['./accept-terms-profile.component.scss'],
})
export class AcceptTermsProfileComponent implements OnInit {
  @Input('terms') terms = false;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
}
