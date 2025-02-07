import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile-video',
  templateUrl: './profile-video.component.html',
  styleUrls: ['./profile-video.component.scss'],
})
export class ProfileVideoComponent  implements OnInit {

  full_url: string = '';

  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateDetails(value);
  }

  get data(): any {
    return this._data;
  }

  constructor(private utility: UtilityService, private users: UsersService, private network: NetworkService) { }

  updateDetails(value){

    if(value){
      let user_id = value.user_id;
      this.checkFileUploaded(user_id);
    }

  }

  ngOnInit() {



  }

  async checkFileUploaded(user_id: any){

    let obj = {
      user_id: user_id
    }
    const res = await this.network.getIntoVideoFile(obj);
    console.log("video",res,user_id);
    if(res.result && res.result.full_url){
      this.full_url = res.result.full_url;
    }

  }

  async onFileSelected(event: any) {

    const files: File[] = Array.from(event.target.files);
    const filesToUpload = files;



    for (const file of filesToUpload) {
      const fileType = file.type; // Get the MIME type of the file

      if (file.size >  25 * 1048576) {
        this.utility.presentFailureToast("File size must be less then 25 mb")
      } else {

        // docString = await this.fileToDataURL(file);
        // send file to url

        const user = this.users.getUser();
        const data = new FormData();
        data.append('file', file);

        console.log("run bind")

        const res = await this.network.uploadIntoVideoFile(data);
        console.log(res)
        if(res.result && res.result.full_url){
          this.full_url = res.result.full_url;
        }
        // if(res.bool == true){
        //   console.log(res)
        // //   let docString = res.result.data;
        // //   await this.addDocInArray(docString, fileType)
        // }

        // await this.addDocInArray(docString, fileType);
      }

    }

  }

}
