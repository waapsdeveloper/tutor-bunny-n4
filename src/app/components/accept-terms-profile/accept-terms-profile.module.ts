import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptTermsProfileComponent } from './accept-terms-profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';

@NgModule({
  declarations: [AcceptTermsProfileComponent],
  imports: [CommonModule, IonicModule, FormsModule, SdErrorInputInfoModule],
  exports: [AcceptTermsProfileComponent],
})
export class AcceptTermsProfileModule {}
