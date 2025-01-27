import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { NavService } from 'src/app/services/nav.service';
import { PendingTrialsService } from 'src/app/services/teacher/pending-trials.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.scss'],
})
export class TrailListComponent {

  displayName
  flag;
  age;

  private _item: any;
  

  @Input() showMoreOptions: boolean = true;
  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.updateItem(value);    
  }
  
  @Output() removeFromList = new EventEmitter<any>();

  // , public globalTrials: GlobalTrialsService
  constructor(private nav: NavService, private utility: UtilityService, private pendingTrialsService: PendingTrialsService) {
   
  }

  async updateItem(value: any) {

    this.displayName = this.utility.getAmericanName(value.student.name);
    this.flag = this.utility.getFlag(value);
    const currentYear = new Date().getFullYear();
    this.age = currentYear - this.item.student.student.dob;

    // let res = await this.network.getTrialById(this.item.id);
    // this.item = res.result;
  }

  async trailStatus(key: string) {
    const res = await this.pendingTrialsService.changeTrailStuts(this.item.id, key, this.item.student.id);    

  }

  async presentAlert(key: string) {
    let alertHeader: string;

    let title = '';
    switch (key) {
      case 'Accepted':
        alertHeader =
          'Accepting the request will deduct 1 credit from your account.';
        title = 'Are you sure to Accept the request?';
        break;
      case 'Rejected':

        title = 'Are you sure to Reject the request?';

        break;
      case 'Blocked':

        title = 'Are you sure to Block the request?';

        break;
      case 'Unblock':

        title = 'Are you sure to Unblock the request?';

        break;
      case 'Complete':

        title = 'Are you sure to Complete the request?';

        break;
      default:
        return;
    }
    let flag = await this.utility.presentConfirm(
      'Yes',
      'Cancel',
      title,
      alertHeader
    );
    if (flag) {
      this.trailStatus(key);
    }
  }

  goToChat() {
    this.nav.push('/tabs/chat');
  }

  
}
