import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-material-photo',
  templateUrl: './material-photo.component.html',
  styleUrls: ['./material-photo.component.scss'],
})
export class MaterialPhotoComponent implements OnInit {

  key = 'images';
  @Input() image = '';
  // @Output('updateMaterialImage') updateMaterialImage: EventEmitter<any> = new EventEmitter<any>();
  // @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() {

  }

  ngOnInit() {

  }

  // onFilesSelected(event: any) {
  //   const files: File[] = Array.from(event.target.files);
  //   files.forEach(file => {
  //     this.handleFile(file, this.uploadMaterialImage.bind(this), this.addMaterialImage.bind(this));
  //   });
  // }

  // async handleFile(file: File, postFunction: (obj: any) => Promise<any>, emitFunction: (image: string) => void) {
  //   const reader = new FileReader();
  //   reader.onload = async () => {
  //     let pmi = reader.result as string;

  //     if (file.size > 1048576) {
  //       pmi = await this.imageService.resizeImage(file, 800, 800);
  //     }
  //     let MaterialId = localStorage.getItem('MaterialId')

  //     let user = JSON.parse(localStorage.getItem('user'));
  //     let obj = {
  //       user_id: user.id,
  //       image: pmi,
  //       course_id: MaterialId
  //     };

  //     const res = await postFunction(obj);
  //     emitFunction(res.result.image);
  //   };
  //   reader.readAsDataURL(file);
  // }

  // async uploadMaterialImage(obj: any): Promise<any> {
  //   console.log(obj);
  //   // return await this.network.postCourseImage(obj);
  // }

  // addMaterialImage(image: string) {
  //   this.materialPhoto.push(image);
  //   this.updateMaterialImage.emit(this.materialPhoto);
  // }
}
