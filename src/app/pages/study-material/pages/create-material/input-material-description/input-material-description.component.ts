import { Component, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-description',
  templateUrl: './input-material-description.component.html',
  styleUrls: ['./input-material-description.component.scss'],
})
export class InputMaterialDescriptionComponent  implements OnInit {

  description: string = '';
  constructor(public createMaterialService: CreateMaterialService) { }

  async ngOnInit() {
    console.log("material description init");
    this.description = await this.createMaterialService.getDescription() as string;
  }

  result(value, key) {
    this.description = value;
    this.createMaterialService.setDescription(value);
  }

}
