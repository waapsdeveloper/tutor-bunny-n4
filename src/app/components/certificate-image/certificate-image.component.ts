import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-certificate-image',
  templateUrl: './certificate-image.component.html',
  styleUrls: ['./certificate-image.component.scss'],
})
export class CertificateImageComponent extends BasePage implements OnInit {
  @Input('profilePhoto') certificate: SafeUrl | undefined;
  @Output('updateCertificate') updateCertificate: EventEmitter<any> = new EventEmitter<any>();


  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

  }


  async handleFile(file: File, postFunction: (obj: any) => Promise<any>, emitFunction: (image: string) => void) {
    const reader = new FileReader();
    reader.onload = async () => {
      let pmi = reader.result as string;

      // Resize if file size is greater than 1MB
      if (file.size > 1048576) {
        pmi = await this.imageService.resizeImage(file, 800, 800);
      }

      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmi
      }

      const res = await postFunction(obj);
      emitFunction(res.result.image);
    };
    reader.readAsDataURL(file);
  }
}
