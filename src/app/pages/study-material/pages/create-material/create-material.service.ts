import { Injectable } from '@angular/core';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';


export interface StudyMaterialModel {
  id: number;
  title: string;
  description: string;
  image: string;
  images: any[];
  price: number;
  language_id: number;
  keyword: string[];
  terms: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CreateMaterialService extends NgSimpleStateBaseRxjsStore<StudyMaterialModel> {

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'createMaterialStore'
    };
  }

  protected initialState(): StudyMaterialModel {
    return {
      id: -1,
      title: '',
      description: '',
      image: '',
      images: [],
      price: 0,
      language_id: -1,
      keyword: [],
      terms: false
    };
  }

  constructor() {
    super();
  }



  setTitle(title: string) {
    this.setState( state => ({
      ...state,
      title
    }));
  }

  setDescription(description: string) {
    this.setState( state => ({
      ...state,
      description
    }));
  }

  setImage(image: string) {
    this.setState( state => ({
      ...state,
      image
    }));
  }

  setImages(images: any[]) {
    this.setState( state => ({
      ...state,
      images
    }));
  }

  setPrice(price: number) {
    this.setState( state => ({
      ...state,
      price
    }));
  }

  setLanguageId(language_id: number) {
    this.setState( state => ({
      ...state,
      language_id
    }));
  }

  setKeyword(keyword: string[]) {
    this.setState( state => ({
      ...state,
      keyword
    }));
  }

  setTerms(terms: boolean) {
    this.setState( state => ({
      ...state,
      terms
    }));
  }

  reset() {
    this.setState( state => ({
      ...state,
      id: -1,
      title: '',
      description: '',
      image: '',
      images: [],
      price: 0,
      language_id: -1,
      keyword: [],
      terms: false
    }));
  }

  getTitle() {

    return new Promise((resolve, reject) => {
      this.selectState(state => state.title).subscribe((data) => {
        resolve(data);
      });
    });

  }

  getDescription() {
    return new Promise((resolve, reject) => {
      this.selectState(state => state.description).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getImage() {
    return this.selectState(state => state.image);
  }

  getImages() {
    return this.selectState(state => state.images);
  }

  getPrice() {
    return new Promise((resolve, reject) => {
      this.selectState(state => state.price).subscribe((data) => {
        resolve(data);
      });
    });
  }

  getLanguageId() {
    return this.selectState(state => state.language_id);
  }

  getKeyword() {
    return this.selectState(state => state.keyword);
  }

  getTerms() {
    return this.selectState(state => state.terms);
  }

  async getFormData(): Promise<StudyMaterialModel> {

    return new Promise((resolve, reject) => {
      this.selectState(state => state).subscribe((data) => {
        resolve(data);
      });
    });

  }





}
