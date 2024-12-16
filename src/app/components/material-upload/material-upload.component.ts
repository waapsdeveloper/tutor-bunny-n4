import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateMaterialService } from 'src/app/services/create-material.service';

@Component({
  selector: 'app-material-upload',
  templateUrl: './material-upload.component.html',
  styleUrls: ['./material-upload.component.scss'],
})
export class MaterialUploadComponent extends BasePage implements OnInit {
  
  
    @Input('key') key = '';
    @Input('materialDoc') materialDoc: SafeUrl[] = [];
    @Output('updateMaterialDoc') updateMaterialDoc: EventEmitter<any> = new EventEmitter<any>();
    @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
    @Input('errorText') errorText = '';
    @Input('needed') needed = true;
    isRequired = false;
  
    constructor(injector: Injector, public materialForm: CreateMaterialService) {
      super(injector);
    }
  
    ngOnInit() {
  
      this.events.subscribe('change-sample-material-to-this', (image: any) => {
        console.log(image);
  
  
        if (image) {
          this.materialForm.formData.image = image;
        }
        else{
          return
        }
  
      }, false)
  
      this.events.subscribe('teacher-material-first-screen-submit-call', (formData) => {
        let v = formData[this.key];
        if (!v || v == '') {
          this.isRequired = true;
          setTimeout(() => {
            this.isRequired = false;
          }, 5000);
        }
      }, false);
    }
  
    onFilesSelected(event: any) {
      const files: File[] = Array.from(event.target.files);
      files.forEach(file => {
        this.handleFile(file, this.uploadMaterialDoc.bind(this), this.addMaterialDoc.bind(this));
      });
    }
  
    async handleFile(file: File, postFunction: (obj: any) => Promise<any>, emitFunction: (image: string) => void) {
      const reader = new FileReader();
      reader.onload = async () => {
        let pmi = reader.result as string;
  
        if (file.size > 1048576) {
          pmi = await this.imageService.resizeImage(file, 800, 800);
        }
        let MaterialId = localStorage.getItem('MaterialId')
  
        let user = JSON.parse(localStorage.getItem('user'));
        let obj = {
          user_id: user.id,
          image: pmi,
          course_id: MaterialId
        };
  
        const res = await postFunction(obj);
        emitFunction(res.result.image);
      };
      reader.readAsDataURL(file);
    }
  
    async uploadMaterialDoc(obj: any): Promise<any> {
      console.log(obj);
      // return await this.network.postCourseImage(obj);
    }
  
    addMaterialDoc(image: string) {
      this.materialDoc.push(image);
      this.updateMaterialDoc.emit(this.materialDoc);
    }
}
