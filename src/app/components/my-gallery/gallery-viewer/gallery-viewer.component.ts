import { Component, OnInit, Input ,Injector} from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { BasePage } from 'src/app/base-page/base-page';
import { GalleryImagePage } from 'src/app/pages/teacher/teacher-profile/teacher-gallery/gallery-image/gallery-image.page';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.component.html',
  styleUrls: ['./gallery-viewer.component.scss'],
})
export class GalleryViewerComponent extends BasePage  {

  @Input() list: any[] = [];


   backUrl = '/teacher-profile/teacher-profile-edit';
   user;
   images = [];
   //list;
   backBtn = '';
   params;
   title;
   gallery = 'false';

   constructor(injector: Injector,private photoViewer: PhotoViewer,private platform: Platform) {
     super(injector);
     this.initialize();
   }



   ionViewWillEnter(): void {
     this.params = this.nav.getQueryParams();

     if (this.params.gallary) {
       this.gallery = this.params.gallary;
     }

     if (this.params.title) {
       this.title = this.params.title;
     }
     if (this.params.backUrl) {
       this.backBtn = this.params.backUrl;
     }
   }
   openPhoto(imageUrl: string) {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      // ✅ Run the native PhotoViewer only on real devices
      this.photoViewer.show(imageUrl, 'Photo Viewer', { share: true });
    } else {
      // ✅ Fallback: Open in a new browser tab
      window.open(imageUrl, '_blank');
    }
  }

   async initialize() {
     const user = this.users.getUser();
     const res = (await this.network.getImage(user.id)) as any;
     this.images = res.result;
   }

   setBackgroundImage(item) {
     return `url('${item.image}')`;
   }

   async addImageInArray(string) {

     let firstIndex = this.images.findIndex((x) => x.image == null);
     if (firstIndex != -1) {
       this.images[firstIndex]['id'] = firstIndex;
       this.images[firstIndex]['image'] = string;
       console.log(this.images);
     }
     const user = this.users.getUser();
     let obj = {
       user_id: user.id,
       image: string,
     };
     let res = await this.network.postImages(obj);
     let image = res.result.image;

     this.events.publish('change-sample-image-to-this', image);
     this.initialize();
   }

   async onFileSelected(event: any) {

     const files: File[] = Array.from(event.target.files);

     // Check if the total images (existing + new) exceed 8
     if (this.images.length + files.length > 8) {
       // Limit the number of files to fit within the 8-image limit
       files.length = 8 - this.images.length;
     }

     for (const file of files) {
       const reader = new FileReader();
       reader.onload = async () => {
         await this.addImageInArray(reader.result as string);
       };
       reader.readAsDataURL(file);
     }
   }


   Back() {
     this.events.publish('change-sample-gallery-to-this', this.images);

     this.nav.pop();
   }

   async clearImage(id: string, event: Event, image) {
     event.stopPropagation();
     this.events.publish('change-sample-gallery-to-this', this.images);

     await this.network.deleteImage(id);
     this.initialize();
   }

   openImage(image) {
     this.nav.push('/teacher-profile/teacher-gallery/gallery-image', {
       backUrl: '/teacher-profile/teacher-gallery',
       image: image,
     });
   }

}
