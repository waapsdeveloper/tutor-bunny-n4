import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-teacher-credits-buy',
  templateUrl: './teacher-credits-buy.page.html',
  styleUrls: ['./teacher-credits-buy.page.scss'],
})
export class TeacherCreditsBuyPage  extends BasePage implements OnInit {

  total = 7;
  payAmount = 10;
  selectedCoin = {
    id: 1,
    name: 'Coin 1',
    price: 10,
    quantity: 1,
    level: 10
  }
  
  activeIndex = 0;

  @ViewChild('slides', { static: false }) slides: SwiperComponent;


  constructor(injector: Injector, private cdr: ChangeDetectorRef) { 
    super(injector);
  }

  ngOnInit() {
  }

  getPayAmount() {
    return `Pay $${this.payAmount}`;
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

  }

  incrementCredit(){

  }

}
