import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.page.html',
  styleUrls: ['./upload-certificate.page.scss'],
})
export class UploadCertificatePage extends BasePage implements OnInit {
  certificates = [];
  loading = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  setBackgroundImage(item) {
    return `url('${item.image}')`;
  }

  async addImageInArray(imageString) {
    this.loading = true;
    let firstIndex = this.certificates.findIndex((x) => x.image == null);

    if (firstIndex != -1) {
      this.certificates[firstIndex]['image'] = imageString;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let obj = {
      user_id: user.id,
      image: imageString,
    };

    let res = await this.network.postCertificate(obj);
    let image = res.result.image;
    this.events.publish('change-sample-certificate-to-this', image);
    this.loading = false;
    this.initialize();
  }

  async initialize() {
    const user = JSON.parse(localStorage.getItem('user'));

    let obj = {
      user_id: user.id,
    };
    const res = (await this.network.getCertificates(obj)) as any;
    this.certificates = res.result;
    console.log(res);
  }

  async clearImage(id: string, event: Event) {
    event.stopPropagation();
    await this.network.deleteCertificates(id);
    let image  = null;
    this.events.publish('change-sample-certificate-to-this', image);

    this.initialize();
  }

  openImage(image) {
    this.nav.push('/course-profile/course-photo/gallery-image', {
      backUrl: '/course-profile/course-photo',
      image: image,
    });
  }

  backToProfile() {
    this.nav.pop();
  }

  async onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async () => {
        await this.addImageInArray(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
