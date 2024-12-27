import { Component, OnInit } from '@angular/core';
import { CreateMaterialService } from '../create-material.service';

@Component({
  selector: 'app-input-material-title',
  templateUrl: './input-material-title.component.html',
  styleUrls: ['./input-material-title.component.scss'],
})
export class InputMaterialTitleComponent implements OnInit {

  title: string = '';
  constructor(public createMaterialService: CreateMaterialService) { }

  async ngOnInit() {
    this.title = await this.createMaterialService.getTitle() as string;
  }

  result(value, key) {
    this.title = value;
    this.createMaterialService.setTitle(value);
  }

}
