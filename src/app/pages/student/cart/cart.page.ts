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
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
// import { StripePayComponent } from 'src/app/stripe-pay/stripe-pay.component';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends BasePage implements OnInit, ViewWillEnter {
  title = 'Cart';
  buttonText = 'Checkout';
  list$;
  subtotal = 0;
  total;
  tax;
  user;

  currency_symbol = '$';
  order;

  activeIndex = 0;
  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  constructor(injector: Injector, private cartService: CartService , private studyMaterialService:GlobalStudyMaterialService) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this.cartService.getList().subscribe((data) => {
      this.list$ = data.map(item => ({ ...item, selected: true }));

      this.title = 'Cart (' + (this.list$ ? this.list$.length : '' ) + ')';
      let item = this.list$ && this.list$[0] ? this.list$[0] : null;

      if (item) {
        this.currency_symbol = item['auth_user_currency_symbol'];
      }

      this.calculateCart();
    });

    // update all items to be selected
  }

  ngOnInit() {
    console.log('aa');
  }

  calculateCart() {
    const selectedList = this.list$.filter((x) => x.selected == true);

    this.subtotal = selectedList.reduce((prev, next) => {
      let n = parseFloat(next.updated_price.replace(/,/g, ''));
      console.log(n);
      return (
        parseFloat(prev) + parseFloat(next.updated_price.replace(/,/g, ''))
      );
    }, 0);

    this.tax = parseFloat(`${this.subtotal * 0.01}`).toFixed(2);
    this.total = parseFloat(`${this.subtotal + parseFloat(this.tax)}`).toFixed(
      2
    );
  }

async  removeCartitem(item) {
    const flag = await this.utility.presentConfirm(
      'Yes',
      'No',
      'Remove from cart',
      'Do you really want to delete this item from cart?'
    );
    if (!flag) {
      return;
    }
    this.cartService.setRemove(item);
  }

  updateSelection($event) {
    console.log($event);
    this.calculateCart();
  }

  getSelectedItems() {
    if (!this.list$) {
      return 'Checkout';
    }

    let items = this.list$.filter((x) => x.selected === true).length;
    return `Checkout (${items} items)`;
  }

  getPayButtonText() {
    if (!this.list$) {
      return 'Pay';
    }

    return `Pay ${this.currency_symbol}${this.total}`;
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

    if(this.activeIndex == 0){
      const countText = this.list$?.length || 0;
      this.title = 'Cart (' + countText + ')';
    }

    if(this.activeIndex == 1){
      this.title = 'Checkout';
    }


    this.cdr.detectChanges();
  }

  async confirmAndMoveToPaySlide(){

    let items = this.list$.filter((x) => x.selected == true);

    if(items.length > 0){
      this.slides?.swiperRef.slideNext(500);
    }


  }

  async checkoutItems() {


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

    const user = this.users.getUser();

    let d = {
      user_id: 1,
      total: this.total,
      tax: this.tax,
      sub_total: this.subtotal,
      currency: user.student.country.currency,
      order_items: order_items,
    };

    const res = await this.network.postStudentOrder(d);

    console.log(res);

    this.order = res;
    console.log(this.order , "order");
    this.events.publish("event-order-number", res);

    for (let i = 0; i < items.length; i++) {
      this.cartService.setRemove(items[i]);
    }

    this.slides?.swiperRef.slideNext(500);

    this.cdr.detectChanges();
   this.events.publish("refresh-study-materials");
  }

  parentBack($event: any){

    const activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;
    if (activeIndex !== 0) {

      this.slides?.swiperRef.slidePrev(500);
    } else {
      this.nav.pop();
    }

  }

  gotoHomePage(){
    this.nav.pop();
  }

  async gotoPurchaseHistory(){
    await this.nav.pop();

    setTimeout(() => {
      this.nav.push('checkout-history')
    }, 1000);

  }


}
