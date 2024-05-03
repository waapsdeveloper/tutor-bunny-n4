import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teacher-gallery',
  templateUrl: './teacher-gallery.page.html',
  styleUrls: ['./teacher-gallery.page.scss'],
})
export class TeacherGalleryPage implements OnInit {

  backUrl = '/teacher-profile/teacher-profile-edit';

  images = [
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
    {
      id: 1,
      image: null
    },
  ]


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  setBackgroundImage(image){
    return 
  }

  addImageInArray(string){
    let firstIndex = this.images.findIndex(x => x.image == null);
    console.log(firstIndex);

    this.images[firstIndex]['id'] = firstIndex;
    this.images[firstIndex]['image'] = string;

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      //let photo = await this.sanitizer.bypassSecurityTrustUrl(reader.result as string);

      // console.log(reader.result as string);
      this.addImageInArray(reader.result as string)

    };
    reader.readAsDataURL(file);
  }



}
