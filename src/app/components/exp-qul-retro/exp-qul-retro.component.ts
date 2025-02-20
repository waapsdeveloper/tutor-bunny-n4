import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';

@Component({
  selector: 'app-exp-qul-retro',
  templateUrl: './exp-qul-retro.component.html',
  styleUrls: ['./exp-qul-retro.component.scss'],
})
export class ExpQulRetroComponent  implements OnInit {

  @Input() data: any = {
    experience: '',
    qualification: ''
  };

  constructor(public modals: ModalService) { }

  ngOnInit() {
    console.log(this.data);
  }

}
