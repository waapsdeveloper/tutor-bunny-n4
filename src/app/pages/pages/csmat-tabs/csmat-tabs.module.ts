import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CsmatTabsPageRoutingModule } from './csmat-tabs-routing.module';

import { CsmatTabsPage } from './csmat-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CsmatTabsPageRoutingModule
  ],
  declarations: [CsmatTabsPage]
})
export class CsmatTabsPageModule {}
