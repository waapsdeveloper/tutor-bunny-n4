import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { log } from 'node:console';
import { BasePage } from 'src/app/base-page/base-page';
import { CartService } from 'src/app/services/cart.service';
// import { StripePayComponent } from 'src/app/stripe-pay/stripe-pay.component';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends BasePage implements OnInit, ViewWillEnter {
  updateSelection($event: any) {
    throw new Error('Method not implemented.');
  }
  title = 'Cart';
  buttonText = 'Checkout';
  list$;
  subtotal = 0;
  total;
  tax;

  currency_symbol = '$'

  activeIndex = 0;
  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  constructor(
    injector: Injector,
    private cartService: CartService,
  ) {
    super(injector);
  }

  ionViewWillEnter(): void {

    this.cartService.getListPromise().then((data) => {
      this.list$ = data;
      this.title = 'Cart (' + this.list$.length + ')';

      console.log(data);



      this.subtotal = this.list$.reduce((prev, next) => {
        let n = parseFloat(next.updated_price.replace(/,/g, ''));
        console.log(n);
        return parseFloat(prev) + parseFloat(next.updated_price.replace(/,/g, ''));
      }, 0);

      this.tax = parseFloat(`${this.subtotal * 0.01}`).toFixed(2);

      this.total = parseFloat(`${this.subtotal + parseFloat(this.tax)}`).toFixed(2)



      this.list$ = this.list$.map(item => {
        item['selected'] = true;
        return item;
      })

      let item = this.list$ && this.list$[0] ? this.list$[0] : null;
      if (item) {
        this.currency_symbol = item['auth_user_currency_symbol']
      }


    });

  }

  ngOnInit() {
    console.log("aa");

  }

  removeCartitem(item) {
    this.cartService.setRemove(item);
  }

  getSelectedItems() {
    if (!this.list$) {
      return 'Checkout';
    }

    let items = this.list$.filter((x) => x.selected === true).length;
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
    // const res = await this.modals.present(StripePayComponent);
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

  checkoutItems() {
    let items = this.list$.filter((x) => x.selected == true);
    const order_items = items.map((x) => {
      return {
        item_id: x.id,
        type: 'material',
        price: x.price,
        quantity: 1,
        sub_total: x.price,
      };
    });

    let sub_total = order_items.reduce((prev, next) => {
      return prev + parseFloat(next.price);
    }, 0);

    let tax = sub_total * 0.1;
    let total = sub_total + tax;

    let d = {
      user_id: 1,
      total: total,
      tax: tax,
      sub_total: sub_total,
      currency: 'USD',
      order_items: order_items,
    };

    const res = this.network.postStudentOrder(d);
    console.log(res);

    for (let i = 0; i < items.length; i++) {
      this.cartService.setRemove(items[i]);
    }

  }
}
