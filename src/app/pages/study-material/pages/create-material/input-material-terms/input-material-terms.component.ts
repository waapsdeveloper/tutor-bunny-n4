import { Component, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-terms',
  templateUrl: './input-material-terms.component.html',
  styleUrls: ['./input-material-terms.component.scss'],
})
export class InputMaterialTermsComponent  implements OnInit {

  hideTerms = false;
  terms$;
  needed: boolean = true;

  constructor(public createMaterialService: CreateMaterialService,) {
    this.createMaterialService.getTerms().subscribe((value) => {
      this.terms$ = value;
    });
  }

  ngOnInit() {}


  result(value, key) {
    this.createMaterialService.setTerms(value);
  }

}
