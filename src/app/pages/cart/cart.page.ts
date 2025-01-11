import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CartService } from 'src/app/services/cart.service';
import { log } from 'console';
import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { StripePayComponent } from 'src/app/stripe-pay/stripe-pay.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends BasePage implements OnInit {

  title = 'Cart';
  list$;

  total = 0;

  constructor(injector: Injector, private cartService: CartService) { 
    super(injector);
  }

  ngOnInit() {
    this.cartService.getList().subscribe( data => {
      this.list$ = data;
      this.title = 'Cart (' + this.list$.length + ')';

      this.total = this.list$.reduce( (prev, next) => {
        return prev + parseFloat(next.price)
      }, 0);
    });
  }

  removeCartitem(item){
    this.cartService.setRemove(item)
  }

  async openStripe() {


    // let obj = {
    //   study_material_id: this.item.id,
    //   amount: this.item.price,
    //   sender_id: this.item.user_id,
    //   reciever_id: this.item.user.teacher.teacher_id,
    //   stripe_payment_id: 'fasdfaksfahdkfakk',
    // };
    //  const res = await this.network.purchaseMaterial(obj);
    // const res = await this.network.buyNow(obj);

    const res = await this.modals.present(StripePayComponent);

    // let obj = {
    //   study_material_id: this.item.id,
    // };
    // const res = await this.network.purchaseMaterial(obj);
    // console.log(res);

    // if (res.bool == true) {
    //   try {
    //     const paymentIntent = res.result.client_secret;
    //     const customer = res.result.customer_id;
    //     const ephemeralKey = res.result.ephemeral_key;

    //     // prepare PaymentSheet with CreatePaymentSheetOption.
    //     await Stripe.createPaymentSheet({
    //       paymentIntentClientSecret: paymentIntent,
    //       customerId: customer,
    //       customerEphemeralKeySecret: ephemeralKey,
    //       merchantDisplayName: 'TutorBunny',
    //     });

    //     // present PaymentSheet and get result.
    //     const result = await Stripe.presentPaymentSheet();
    //     console.log(result);
    // if (res.bool == true) {
    //   try {
    //     const paymentIntent = res.result.client_secret;
    //     const customer = res.result.customer_id;
    //     const ephemeralKey = res.result.ephemeral_key;

    //     // prepare PaymentSheet with CreatePaymentSheetOption.
    //     await Stripe.createPaymentSheet({
    //       paymentIntentClientSecret: paymentIntent,
    //       customerId: customer,
    //       customerEphemeralKeySecret: ephemeralKey,
    //       merchantDisplayName: 'TutorBunny',
    //     });

    //     // present PaymentSheet and get result.
    //     const result = await Stripe.presentPaymentSheet();

    //     if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
    //       // Happy path
    //     }
    //   } catch (error) {}
    // }
  }

}
