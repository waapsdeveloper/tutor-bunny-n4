import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFilterPage } from './search-filter.page';
import { userResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchFilterPage,
    resolve: {
      user: userResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFilterPageRoutingModule {}
