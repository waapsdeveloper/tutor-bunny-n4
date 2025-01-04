import { Component, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-language',
  templateUrl: './input-material-language.component.html',
  styleUrls: ['./input-material-language.component.scss'],
})
export class InputMaterialLanguageComponent  implements OnInit {

  language: any = null;
  language_id: number = null;
  language_name: string = null;

  constructor(public createMaterialService: CreateMaterialService) {
    this.createMaterialService.getLanguageId().subscribe((value) => {
      this.language_id = value;
    });

    this.createMaterialService.getLanguage().subscribe((value) => {
      this.language = value;
    });

  }

  async ngOnInit() {

  }

  result(value, key) {
    this.createMaterialService.setLanguage(value);
    this.createMaterialService.setLanguageId(value.id);
  }

}
