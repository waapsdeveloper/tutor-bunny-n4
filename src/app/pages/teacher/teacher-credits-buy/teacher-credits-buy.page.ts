import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-teacher-credits-buy',
  templateUrl: './teacher-credits-buy.page.html',
  styleUrls: ['./teacher-credits-buy.page.scss'],
})
export class TeacherCreditsBuyPage  extends BasePage implements OnInit {

  currency_symbol ;
  total = 0;
  tax = 0;
  payAmount = 0;


  apiCoins: any[] = [];


  selectedCoin = {
    id: 1,
    name: 'Coin 1',
    price: 10,
    quantity: 1,
    level: 10,
  }

  activeIndex = 0;

  @ViewChild('slides', { static: false }) slides: SwiperComponent;


  constructor(injector: Injector, private cdr: ChangeDetectorRef) {
    super(injector);
  }

  async ngOnInit() {
    const res = await this.network.getCoinLevels();
    console.log(res);

    const d = res.result.data;
    this.currency_symbol = d[0]?.currency_symbol;

    this.apiCoins = d.map( (coin, index) => {
      return {
        id: index,
        name: coin.name,
        price: parseFloat(coin.price.replace(/[^0-9.-]/g, '')),
        quantity: 1,
        level: parseInt(coin.coin_level),
        currency_symbol: coin.currency_symbol
      }
    });

    this.selectedCoin = Object.assign({}, this.apiCoins[0]);
    console.log(this.selectedCoin)
    this.calculateTotal();
  }

  getPayAmount() {
    return `Pay ${this.currency_symbol} ${this.payAmount}`;
  }

  openStripe(){

  }

  buyCredits(number) {

  }

  continueToNextSlide() {
    this.slides?.swiperRef?.slideNext();
  }



  purchaseCredits() {
    let obj =
    {
        "user_id": 57,
        "total": 500.00,
        "tax": 10.00,
        "sub_total": 510.00,
        "currency": "USD",
        "credit_items": [
            {
                "item_id": 101,
                "type": "book",
                "price": 50.00,
                "quantity": 1,
                "sub_total": 50.00
            },
        ]
    }


  }


  onSlideChanged() {
    this.activeIndex = this.slides?.swiperRef?.activeIndex ?? 0;
    this.cdr.detectChanges();
  }

  decrementCredit(){

    // check if level not less then 5
    const d = parseInt(`${this.selectedCoin.level}`)
    if(d < 5) return;
    this.selectedCoin.level = d - 5;
    this.calculateTotal();

  }

  incrementCredit(){
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

}
