import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss'],
})
export class SelectYearComponent  implements OnInit {
  currentYear = 2024;
  list: any[] = [

  ];
  country
  search: "";
  page = 1;
  constructor(private modals: ModalService, private network: NetworkService, private utility: UtilityService) {
    // this.initialize();
  }

  ngOnInit() {
    for(var i = 0; i < 20; i++){
      const y = this.currentYear - i;
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


  async loadMore($event) {



    let yr = this.list[this.list.length - 1];
    for(var i = 0; i < 20; i++){
      const y = yr.name - i;
      let obj = {
        id: i,
        name: y
      }

      let findIndex = this.list.findIndex(x => x.name == obj.name)
      if(findIndex == -1){
        this.list.push(obj)
      }

    }
    $event.target.complete();
  }


}
