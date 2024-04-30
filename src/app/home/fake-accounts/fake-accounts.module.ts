import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeAccountsComponent } from './fake-accounts.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FakeAccountsComponent],
  imports: [CommonModule, IonicModule],
  exports: [FakeAccountsComponent],
})
export class FakeAccountsModule {}
