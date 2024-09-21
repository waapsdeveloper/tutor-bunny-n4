import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-certificate-image',
  templateUrl: './certificate-image.component.html',
  styleUrls: ['./certificate-image.component.scss'],
})
export class CertificateImageComponent extends BasePage implements OnInit {
  @Input('profilePhotos') certificates: SafeUrl[] = [];
  @Output('updateCertificates') updateCertificates: EventEmitter<any> =
    new EventEmitter<any>();
  samplecertificateImage = '/assets/gallary.png';

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {

    this.events.subscribe('change-sample-certificate-to-this', (image: any) => {
      console.log(image);


      if (image) {
        this.samplecertificateImage = image;
      }
      else{
        this.samplecertificateImage = '/assets/gallary.png';
      }

    }, false)



  }

  onFilesSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    files.forEach((file) => {
      this.handleFile(
        file,
        this.uploadCertificate.bind(this),
        this.addCertificate.bind(this)
      );
    });
  }

  async handleFile(
    file: File,
    postFunction: (obj: any) => Promise<any>,
    emitFunction: (image: string) => void
  ) {
    const reader = new FileReader();
    reader.onload = async () => {
      let pmi = reader.result as string;

      if (file.size > 1048576) {
        pmi = await this.imageService.resizeImage(file, 800, 800);
        // return
      }

      let user = JSON.parse(localStorage.getItem('user'));
      let obj = {
        user_id: user.id,
        image: pmi,
      };

      const res = await postFunction(obj);
      emitFunction(res.result.image);
    };
    reader.readAsDataURL(file);
  }

  async uploadCertificate(obj: any): Promise<any> {
    console.log(obj);
    return await this.network.postCertificate(obj);
  }

  addCertificate(image: string) {
    this.certificates.push(image);
    this.updateCertificates.emit(this.certificates);
  }
  async initialize() {
    const user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
    };
    const res = (await this.network.getCertificates(obj)) as any;
     let certificates = res.result;
    if (certificates.length > 0) {
      let item = certificates[0];
      this.samplecertificateImage = item.image;
      console.log(this.samplecertificateImage);

    }
    console.log(res);
  }
}
