import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import { MaterialCardModule } from './material-card/material-card.module';
import { GlobalListViewModule } from "../../../../components/global-list-view/global-list-view.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesPageRoutingModule,
    MaterialCardModule,
    GlobalListViewModule
],
  declarations: [NotesPage]
})
export class NotesPageModule {}
