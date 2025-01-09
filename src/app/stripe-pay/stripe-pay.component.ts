import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { log } from 'node:console';

@Component({
  selector: 'app-stripe-pay',
  templateUrl: './stripe-pay.component.html',
  styleUrls: ['./stripe-pay.component.scss'],
})
export class StripePayComponent  implements OnInit {
  stripe: any;
  cardElement: any;
  clientSecret: string = '';
  constructor() { }

  ngOnInit() {
    console.log("aa");
    this.initialize();
  }

  async initialize (){
    this.stripe = await loadStripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async handlePayment() {


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
