import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateImageComponent } from './certificate-image.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CertificateImageComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
exports:[CertificateImageComponent]
})
export class CertificateImageModule { }
