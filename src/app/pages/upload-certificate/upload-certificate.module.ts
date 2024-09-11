import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadCertificatePageRoutingModule } from './upload-certificate-routing.module';

import { UploadCertificatePage } from './upload-certificate.page';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadCertificatePageRoutingModule,
    SdHeaderTopModule,
    SdButtonGrayModule
  ],
  declarations: [UploadCertificatePage]
})
export class UploadCertificatePageModule {}
