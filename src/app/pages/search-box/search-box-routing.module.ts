import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBoxPage } from './search-box.page';
import { userResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchBoxPage,
    resolve: {
      user: userResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBoxPageRoutingModule {}
