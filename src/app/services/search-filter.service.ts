import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  formData = {
    keywords: null,
    language: null,
    mode_type: null,
    capacity: null,
    price: null,
    name: null,
    country: null,
    from_age: null,
    to_age: null,
    keyword_id: null,
    hourly_rate: null,
    country_id: null,
    travel_policy_id: null,
  };
  searchList: any[] = [];
  countryId = null;
  stateId = null;
  keywords;

  constructor(private network: NetworkService) {}

  updateFormData(value: any, key: string): void {
    this.formData[key] = value;
    if (key == 'keyword') {
      this.formData['keyword_id'] = value[0].id;
      this.formData['keywords'] = value;
    }
  }

  getFormData(): any {
    return this.formData;
  }

  async submitFormData(): Promise<void> {
    return new Promise(async (resolve) => {

    let obj = {
      search: '',
      page: 1,
      liked: false,
      language_id: this.formData.language,
      price: this.formData.price,
      mode: this.formData.mode_type,
      capacity: this.formData.capacity,
      hourly_rate: this.formData.hourly_rate,
      teacher_name: this.formData.name,
      country_id: this.formData.country,
      travel_policy_id: this.formData.travel_policy_id,
      from_age: this.formData.from_age,
      to_age: this.formData.to_age,
      keyword_id: this.formData.keyword_id,
      keyword: this.formData.keywords,
    };
    const res = (await this.network.getAllCourses(obj)) as any;
    this.searchList = res.result.data;
    resolve(res);
    });
    // Add additional logic for submission if needed.
  }

  setCountryId(countryId: string): void {
    this.countryId = countryId;
  }

  getCountryId(): string | null {
    return this.countryId;
  }

  setStateId(stateId: string): void {
    this.stateId = stateId;
  }

  getStateId(): string | null {
    return this.stateId;
  }

  onKeyUp(search) {
    return new Promise(async (resolve) => {
      let obj = {
        search: search,
        page: 1,
        liked: false,
      };
      let res = (await this.network.getAllCourses(obj)) as any;
      this.searchList = res.result.data;
      resolve;
    });
  }
}
