import { Component, Injector, OnInit } from '@angular/core';
import { log } from 'node:console';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.page.html',
  styleUrls: ['./upload-certificate.page.scss'],
})
export class UploadCertificatePage extends BasePage implements OnInit {
  certificates = [];
  firstImage;
  loading = false;
  remainingSlots
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
    this.firstImage = imageString;


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
  }

  async clearImage(id: string, event: Event) {
    event.stopPropagation();
    await this.network.deleteCertificates(id);
    let firstIndex = this.certificates.findIndex((x) => x.image == null);

    if (firstIndex == -1) {
      let image = this.certificates[0]['image']
      this.events.publish('change-sample-certificate-to-this', image);
      this.initialize();
    }
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
    this.remainingSlots = 8 - this.certificates.length;

    if (this.remainingSlots <= 0) {
      alert('You have already uploaded the maximum of 8 images.');
      return;
    }

    const filesToUpload = files.slice(0, this.remainingSlots);



    for (const file of filesToUpload) {
      let imageString: string;
      if (file.size > 1048576) {

        imageString = await this.imageService.resizeImage(file, 800, 800);

      } else {
        imageString = await this.fileToDataURL(file);
      }
      await this.addImageInArray(imageString);
    }
  }
  fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
