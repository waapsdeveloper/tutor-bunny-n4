import { Component, EventEmitter, Injector, Input, OnInit, Output,  } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-prise-range',
  templateUrl: './course-prise-range.component.html',
  styleUrls: ['./course-prise-range.component.scss'],
})
export class CoursePriseRangeComponent extends BasePage implements OnInit {
  user: any;
  minValue: number = 0;
  maxValue: number = 100;
  @Input('currentValue') currentValue = 0;
  currency_symbol = '$';
  @Input('key') key = '';

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
    this.user = this.users.getUser();
  }

  async callApi() {
    try {
      let res = await this.network.getpriceRange(this.user.id);

      if(res){


        this.minValue = res.min_price;
        this.maxValue = res.max_price;
        this.currency_symbol = res.currency_symbol

        if(!this.currentValue){
          this.currentValue = this.minValue;
        }

      }
    } catch (error) {
      console.error('Error fetching price range:', error);
    }
  }

  pinFormatter(value: number): string {
    return `${value}`;
  }

  onRangeChange(event: any) {
    this.currentValue = event.detail.value;
    this.onChange.emit(this.currentValue);


  }

  ngOnInit() {
    this.callApi();
  }
}
