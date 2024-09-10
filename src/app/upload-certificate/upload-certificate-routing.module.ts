import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadCertificatePage } from './upload-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: UploadCertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadCertificatePageRoutingModule {}
