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
  language: any;
  keywords: string[];
  terms: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class
CreateMaterialService extends NgSimpleStateBaseRxjsStore<StudyMaterialModel> {

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
      language: null,
      keywords: [],
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

  addImageInImages(image: any) {
    this.setState( state => ({
      ...state,
      images: [...state.images, image]
    }));
  }

  removeImageInImagesIndex(index){
    this.setState( state => {
      const images = [...state.images];
      images.splice(index, 1);
      return {
        ...state,
        images
      }
    })
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

  setLanguage(language: number) {
    this.setState( state => ({
      ...state,
      language
    }));
  }

  // setKeyword(keyword: string[]) {
  //   this.setState( state => ({
  //     ...state,
  //     keyword
  //   }));
  // }

  setKeywords(keywords: any[]) {
    this.setState( state => ({
      ...state,
      keywords
    }));
  }

  addKeywordInKeywords(keyword: any) {
    this.setState( state => ({
      ...state,
      keywords: [...state.keywords, keyword]
    }));
  }

  removeKeywordInKeywordsIndex(index){
    this.setState( state => {
      const keywords = [...state.keywords];
      keywords.splice(index, 1);
      return {
        ...state,
        keywords
      }
    })
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
      language: null,
      keyword: [],
      terms: false
    }));
  }

  getTitle() {
    return this.selectState(state => state.title);
  }

  getDescription() {
    return this.selectState(state => state.description);
  }

  getImage() {
    return this.selectState(state => state.image);
  }

  getImages() {
    return this.selectState(state => state.images);
  }

  getPrice() {
    return this.selectState(state => state.price);
  }

  getLanguageId() {
    return this.selectState(state => state.language_id);
  }

  getLanguage() {
    return this.selectState(state => state.language);
  }

  getKeywords() {
    return this.selectState(state => state.keywords);
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
