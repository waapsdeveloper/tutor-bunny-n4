import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateMaterialService } from '../create-material/create-material.service';

@Component({
  selector: 'app-create-material-docs',
  templateUrl: './create-material-docs.page.html',
  styleUrls: ['./create-material-docs.page.scss'],
})
export class CreateMaterialDocsPage extends BasePage implements OnInit {

  title = 'Study Material Documents';
  doc: null
  params;
  remainingSlots;

  docs$: any[] = [];


  constructor(
    injector: Injector,
    public createMaterialService: CreateMaterialService
  ) {
    super(injector);



  }

  ngOnInit() {
    this.initialize();
  }


  async initialize() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

    this.createMaterialService.getDocs().subscribe((data) => {
      this.docs$ = data;
    });



  }

  setBackgroundImage(item) {
    // return `url('${item.image}')`;

    console.log(item.type);

    let path = "assets/svg/filetypes/";
    if (item.type.includes("pdf")) {
      path += "pdf.svg";
    }

    return `url(${path})`;
  }

  async addDocInArray(docString, type) {

    let obj = {
      feature: false,
      doc: docString,
      type: type
    };

    await this.createMaterialService.addDocInDocs(obj);
  }


  async onFileSelected(event: any) {

    const files: File[] = Array.from(event.target.files);
    this.remainingSlots = 8 - this.docs$.length;

    if (this.remainingSlots <= 0) {
      alert('You have already uploaded the maximum of 8 images.');
      return;
    }

    const filesToUpload = files.slice(0, this.remainingSlots);

    console.log(filesToUpload);

    for (const file of filesToUpload) {
      const fileType = file.type; // Get the MIME type of the file
      let docString: string;
      if (file.size > 1048576) {
        this.utility.presentFailureToast("File size must be less then 10 mb")
      } else {
        docString = await this.fileToDataURL(file);
      }
      await this.addDocInArray(docString, fileType);
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

  async updateFeatureImage(item: any, index, event: Event) {
    event.stopPropagation();

    for (let i = 0; i < this.docs$.length; i++) {
      this.docs$[i].feature = false;
    }

    this.docs$[index].feature = true;

    this.createMaterialService.setDocs(this.docs$)
  }

  async clearImage(index: any, event: Event) {
    event.stopPropagation();
    console.log(event);

    this.createMaterialService.removeImageInImagesIndex(index)

  }

  openDoc(doc) {
    // this.nav.push('/course-profile/course-photo/gallery-image', {
    //   backUrl: '/course-profile/course-photo',
    //   image: image,
    // });
  }

}

