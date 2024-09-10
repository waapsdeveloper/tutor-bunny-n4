import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadCertificatePageRoutingModule } from './upload-certificate-routing.module';

import { UploadCertificatePage } from './upload-certificate.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../components/sd-button-gray/sd-button-gray.module';

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
