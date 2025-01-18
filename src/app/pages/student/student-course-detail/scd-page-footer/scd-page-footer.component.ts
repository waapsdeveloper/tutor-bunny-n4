import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-footer',
  templateUrl: './scd-page-footer.component.html',
  styleUrls: ['./scd-page-footer.component.scss'],
})
export class ScdPageFooterComponent  implements OnInit {
data;
btn_loading;
type;
loading;

constructor() { }

ngOnInit() {}

goToChat() {
}

presentAlert() {
}

requestTrail() {
}
}
