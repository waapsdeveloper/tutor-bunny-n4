import { Injectable } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {

  private selectedKeyword: any = null;
  searchText: any = null;




  formData = {
    search: null,
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
  searchTitals: any[] = [];
  countryId = null;
  stateId = null;
  keywords;
  searchCourses;
  page = 0;
  last_page = -1;
  constructor(private network: NetworkService) {}



  getSelectedKeyword() {
    return this.selectedKeyword;
  }
  setSelectedKeyword(keyword) {
    this.selectedKeyword = keyword;
  }




  updateFormData(value: any, key: string): void {
    this.formData[key] = value;
    if (key == 'keyword' && value && value.length > 0) {
      this.formData['keyword_id'] = value[0].id;
      this.formData['keywords'] = value;
    }
  }

  getFormData(): any {
    return this.formData;
  }

  async submitFormData(page): Promise<any> {

      let obj = {
        search: '',
        page: page,
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
      return obj;

      // const res = (await this.network.getAllCourses(obj)) as any;
      // const data = res.result;

      // this.page = data.current_page;
      // this.last_page = data.last_page;
      // if (page === 1) {
      //   this.searchList = data.data;
      // } else {
      //   this.searchList = [...this.searchList, ...data.data];
      // }

    // });
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


}
