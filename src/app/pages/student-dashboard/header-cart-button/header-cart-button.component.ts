import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-header-cart-button',
  templateUrl: './header-cart-button.component.html',
  styleUrls: ['./header-cart-button.component.scss'],
})
export class HeaderCartButtonComponent implements OnInit {

  constructor(private nav: NavService) { }

  ngOnInit() {
    
  }

  toogleView(view) {

    if (view == 'cart'){
      this.nav.push('/cart');
    }

  }

}
