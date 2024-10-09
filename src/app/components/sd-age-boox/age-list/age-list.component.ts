import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-age-list',
  templateUrl: './age-list.component.html',
  styleUrls: ['./age-list.component.scss'],
})
export class AgeListComponent  implements OnInit {
  currentage = 1;
  list: any[] = [

  ];
  country
  search: "";
  page = 1;
  constructor(private modals: ModalService) {
  }

  ngOnInit() {
    for(var i = 0; i < 99; i++){
      const y = this.currentage + i;
      let obj = {
        id: i,
        name: y
      }
      this.list.push(obj)
    }
  }

  selection(item) {
    this.modals.dismiss(item);
  }

  back(){
    this.modals.dismiss()
  }


}
