import { Component, OnInit, Injector } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { BasePage } from '../base-page/base-page';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-stripe-pay',
  templateUrl: './stripe-pay.component.html',
  styleUrls: ['./stripe-pay.component.scss'],
})
export class StripePayComponent extends BasePage implements OnInit {

  isPaid = false;

  title = 'Cart';
  list$;

  stripe: any;
  cardElement: any;
  clientSecret: string = '';

  total = 0;

  constructor(injector: Injector, private cartService: CartService) {
    super(injector);
  }

  ngOnInit() {

    this.initialize();

    this.cartService.getList().subscribe( data => {
      this.list$ = data;
      this.title = 'Cart (' + this.list$.length + ')';

      this.total = this.list$.reduce( (prev, next) => {
        return prev + parseFloat(next.price)
      }, 0);
    });
  }


  async initialize (){
    this.stripe = await loadStripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async handlePayment() {

    this.isPaid = true;

    let items = this.list$.filter( x => x.selected == true) as any[];
    let item_total = items.reduce( (prev, next) => {
      return prev + parseFloat(next.price)
    }, 0);

    let obj = {
      cart_ids: items.map( x => x.id),
      item_total: item_total,
      tax: 10,
      total: item_total + 10
    }
    const res = await this.network.materialCheckout(obj);
    console.log(res);

    items.forEach(element => {
      this.cartService.setRemove(element)
    });

    this.modals.dismiss();

    // try {
    //   const { paymentIntent, error } = await this.stripe.confirmCardPayment(this.clientSecret, {
    //     payment_method: {
    //       card: this.cardElement,
    //     },
    //   });

    //   if (error) {
    //     console.error('Payment failed:', error.message);
    //   } else if (paymentIntent.status === 'succeeded') {
    //     console.log('Payment succeeded:', paymentIntent);
    //   }
    // } catch (error) {
    //   console.error('Error handling payment:', error);
    // }
  }


}
