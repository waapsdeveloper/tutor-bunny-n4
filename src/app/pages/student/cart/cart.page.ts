import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CartService } from 'src/app/services/cart.service';
import { StripePayComponent } from 'src/app/stripe-pay/stripe-pay.component';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends BasePage implements OnInit {

  title = 'Cart';
  buttonText = 'Checkout'
  list$;
  total = 0;

  activeIndex = 0;

  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  constructor(injector: Injector, private cartService: CartService, private cdr: ChangeDetectorRef) { 
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

  getSelectedItems(){

    if(!this.list$){
      return 'Checkout'
    }

    let items = this.list$.filter( x => x.selected == true).length;
    return `Checkout (${items}) items`;
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

  
  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;
    this.cdr.detectChanges();
  }

}
