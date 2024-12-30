import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMaterialDocsPageRoutingModule } from './create-material-docs-routing.module';

import { CreateMaterialDocsPage } from './create-material-docs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMaterialDocsPageRoutingModule
  ],
  declarations: [CreateMaterialDocsPage]
})
export class CreateMaterialDocsPageModule {}
