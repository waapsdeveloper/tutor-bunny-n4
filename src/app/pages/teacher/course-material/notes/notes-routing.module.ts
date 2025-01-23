import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { materialListResolver } from 'src/app/resolvers/teacher/materialList.resolver';

import { NotesPage } from './notes.page';

const routes: Routes = [
  {
    path: '',
    component: NotesPage,
    resolve: {
      materialList: materialListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesPageRoutingModule {}
