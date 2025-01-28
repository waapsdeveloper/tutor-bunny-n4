import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-teacher-credits-buy',
  templateUrl: './teacher-credits-buy.page.html',
  styleUrls: ['./teacher-credits-buy.page.scss'],
})
export class TeacherCreditsBuyPage extends BasePage implements OnInit {
  currency_symbol;
  total = 0;
  tax = 0;
  payAmount = 0;
  order_detail;
  user;

  apiCoins: any[] = [];

  selectedCoin = {
    id: 1,
    name: 'Coin 1',
    price: 10,
    quantity: 1,
    level: 10,
  };

  activeIndex = 0;

  @ViewChild('slides', { static: false }) slides: SwiperComponent;

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    const res = await this.network.getCoinLevels();
    console.log(res);
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.user = user;
    const d = res.result.data;
    this.currency_symbol = d[0]?.currency_symbol;

    this.apiCoins = d.map((coin, index) => {
      return {
        id: index,
        name: coin.name,
        price: parseFloat(coin.price.replace(/[^0-9.-]/g, '')),
        quantity: 1,
        level: parseInt(coin.coin_level),
        currency_symbol: coin.currency_symbol,
      };
    });

    this.selectedCoin = Object.assign({}, this.apiCoins[0]);
    console.log(this.selectedCoin);
    this.calculateTotal();
  }

  getPayAmount() {
    // Return button text based on the current slide
    switch (this.activeIndex) {
      case 0:
        return `Pay ${this.currency_symbol} ${this.payAmount}`;
      case 1:
        return 'Continue to the Home Page';

      default:
        return '';
    }
  }

  openStripe() {}

  buyCredits(number) {}

  async continueToNextSlide() {
    if (this.activeIndex === 0) {
      await this.makeOrder(); // Wait for the order API call
      this.slides?.swiperRef?.slideNext(); // Navigate to the next slide
    }
  }
  purchaseCredits() {
    let obj = {
      user_id: 57,
      total: 500.0,
      tax: 10.0,
      sub_total: 510.0,
      currency: 'USD',
      credit_items: [
        {
          item_id: 101,
          type: 'book',
          price: 50.0,
          quantity: 1,
          sub_total: 50.0,
        },
      ],
    };
  }

  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;
    this.cdr.detectChanges();
  }

  decrementCredit() {
    // check if level not less then 5
    const d = parseInt(`${this.selectedCoin.level}`);
    if (d < 5) return;
    this.selectedCoin.level = d - 5;
    this.calculateTotal();
  }

  incrementCredit() {
    this.selectedCoin.level = parseInt(`${this.selectedCoin.level}`) + 5;
    this.calculateTotal();
  }

  selectCoin(_t31: any) {
    this.selectedCoin = Object.assign({}, _t31);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.selectedCoin.price * this.selectedCoin.level;
    this.total = parseFloat(this.total.toFixed(2));

    this.tax = this.total * 0.07;
    this.tax = parseFloat(this.tax.toFixed(2));

    this.payAmount = this.total + this.tax;
    this.payAmount = parseFloat(this.payAmount.toFixed(2));
  }

  async makeOrder() {
    let obj = {
      user_id: this.user.id,
      order_amount: this.total,
      tax: this.tax,
      sub_total: this.payAmount,
      user_currency: this.user.teacher.auth_user_currency_symbol,
      coin_id: this.selectedCoin.id,
      price: this.selectedCoin.price,
      coin_quantity: this.selectedCoin.level,
    };
    let res = await this.network.buyCredit(obj);
    this.order_detail = res.result;
    console.log(this.order_detail);
  }
}
