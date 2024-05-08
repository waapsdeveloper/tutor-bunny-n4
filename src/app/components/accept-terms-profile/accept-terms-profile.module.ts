import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptTermsProfileComponent } from './accept-terms-profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AcceptTermsProfileComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [AcceptTermsProfileComponent],
})
export class AcceptTermsProfileModule {}
