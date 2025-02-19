import { Injectable } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state'; // Adjust imports as needed

export interface GlobalSearchFormModel {
  search: string;
  keywords: any[];
  language: string;
  mode_type: string;
  capacity: string;
  price: number;
  name: string;
  country: any;
  from_age: string;
  to_age: string;
  keyword_id: string;
  hourly_rate: string;
  country_id: number;
  travel_policy: any,
  travel_policy_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService extends NgSimpleStateBaseRxjsStore<GlobalSearchFormModel> {
  
  
  ngrxModelName: string = 'GlobalSearchFormModel';

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: this.ngrxModelName,
    };
  }

  initialState(): GlobalSearchFormModel {
    return {
      search: '',
      keywords: [],
      language: '',
      mode_type: '',
      capacity: '',
      price: 0,
      name: '',
      country: null,
      from_age: '',
      to_age: '',
      keyword_id: '',
      hourly_rate: '',
      country_id: null,
      travel_policy: null,
      travel_policy_id: '',
    };
  }

  constructor(private network: NetworkService) {
    super()
  }

  getFormData(){
    return this.selectState((state) => state );
  }

  updateFormData(value: any, key: string): void {
    this.setState((state) => ({
     ...state,
      [key]: value,
    }));
  }

  setSearch(search: string){
    this.setState((state) => {
      return {
        ...state,
        search: search,
      };
    });
  }

  setKeywords(keywords: any[]) {
    this.setState((state) => ({
      ...state,
      keywords: keywords,
    }));
  }
  
  setLanguage(language: string) {
    this.setState((state) => ({
      ...state,
      language: language,
    }));
  }
  
  setModeType(mode_type: string) {
    this.setState((state) => ({
      ...state,
      mode_type: mode_type,
    }));
  }
  
  setCapacity(capacity: string) {
    this.setState((state) => ({
      ...state,
      capacity: capacity,
    }));
  }
  
  setPrice(price: number) {
    this.setState((state) => ({
      ...state,
      price: price,
    }));
  }

  setPriceCurrency(price_currency: string) {
    this.setState((state) => ({
      ...state,
      price_currency: price_currency,
    }));
  }
  
  setName(name: string) {
    this.setState((state) => ({
      ...state,
      name: name,
    }));
  }
  
  setCountry(country: string) {
    this.setState((state) => ({
      ...state,
      country: country,
    }));
  }
  
  setFromAge(from_age: string) {
    this.setState((state) => ({
      ...state,
      from_age: from_age,
    }));
  }
  
  setToAge(to_age: string) {
    this.setState((state) => ({
      ...state,
      to_age: to_age,
    }));
  }
  
  setKeywordId(keyword_id: string) {
    this.setState((state) => ({
      ...state,
      keyword_id: keyword_id,
    }));
  }
  
  setHourlyRate(hourly_rate: string) {
    this.setState((state) => ({
      ...state,
      hourly_rate: hourly_rate,
    }));
  }

  setHourlyRateCurrency(hourly_rate_currency: string) {
    this.setState((state) => ({
      ...state,
      hourly_rate_currency: hourly_rate_currency,
    }));
  }
  
  setCountryId(country_id: number) {
    this.setState((state) => ({
      ...state,
      country_id: country_id,
    }));
  }
  
  setTravelPolicyId(travel_policy_id: string) {
    this.setState((state) => ({
      ...state,
      travel_policy_id: travel_policy_id,
    }));
  }
  

  getSearch() {
    return this.selectState((state) => state.search);
  }
  
  getKeywords() {
    return this.selectState((state) => state.keywords);
  }
  
  getLanguage() {
    return this.selectState((state) => state.language);
  }
  
  getModeType() {
    return this.selectState((state) => state.mode_type);
  }
  
  getCapacity() {
    return this.selectState((state) => state.capacity);
  }
  
  getPrice() {
    return this.selectState((state) => state.price);
  }
  
  getName() {
    return this.selectState((state) => state.name);
  }
  
  getCountry() {
    return this.selectState((state) => state.country);
  }
  
  getFromAge() {
    return this.selectState((state) => state.from_age);
  }
  
  getToAge() {
    return this.selectState((state) => state.to_age);
  }
  
  getKeywordId() {
    return this.selectState((state) => state.keyword_id);
  }
  
  getHourlyRate() {
    return this.selectState((state) => state.hourly_rate);
  }
  
  getCountryId() {
    return this.selectState((state) => state.country_id);
  }
  
  getTravelPolicyId() {
    return this.selectState((state) => state.travel_policy_id);
  }
  reset() {
    this.setState(() => this.initialState());
  }
  
  getItemByKeyPromise(key: string): Promise<any | undefined> {
    return new Promise((resolve) => {
      this.selectState((state) => state[key]).subscribe((data) => {
        resolve(data);
      });
    });
  }

  removeKeyword(keyword: any){
    this.setState((state) => {
      return {
       ...state,
        keywords: state.keywords.filter((item) => item.id !== keyword.id),
      };
    });
  }


  
}
