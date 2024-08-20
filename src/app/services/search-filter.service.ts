import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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
    state: null,
    city: null,
    zip_code: null,
    from_age: null,
    to_age: null
  };

  countryId= null;
  stateId= null;

  constructor() { }

  updateFormData(value: any, key: string): void {
    this.formData[key] = value;
    console.log(this.formData);
  }

  getFormData(): any {
    return this.formData;
  }

  submitFormData(): void {
    console.log("Submitting form data:", this.formData);
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
