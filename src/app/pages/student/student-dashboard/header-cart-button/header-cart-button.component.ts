import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-header-cart-button',
  templateUrl: './header-cart-button.component.html',
  styleUrls: ['./header-cart-button.component.scss'],
})
export class HeaderCartButtonComponent implements OnInit {

  cartCount$;

  constructor(private nav: NavService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCount().subscribe( data => {
      this.cartCount$ = data;
    })
  }

  toogleView(view) {

    if (view == 'cart'){
      this.nav.push('/cart');
    }

  }

}
