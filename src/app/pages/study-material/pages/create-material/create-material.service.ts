import { Injectable } from '@angular/core';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';


export interface StudyMaterialModel {
  id: number;
  title: string;
  description: string;
  image: any;
  images: any[];
  docs: any[];
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

  base64ImagesArray: any[] = []

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
      image: null,
      images: [],
      docs: [],
      price: null,
      language_id: -1,
      language: null,
      keywords: [],
      terms: false
    };
  }

  constructor() {
    super();
  }

  setStateItem(item: any) {
    this.setState( () => item );
  }

  setId(id: number) {
    this.setState( state => ({
      ...state,
      id
    }));
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

  setImage(image: any) {


    this.setState( state => ({
      ...state,
      image: image
    }));
  }

  setImages(images: any[]) {
    this.setState( state => ({
      ...state,
      images: images
    }));
  }

  addImageInImages(obj: any) {

    // if image is base64 string then store in local array else store in state if its a url 
    if (typeof obj.image === 'string' && obj.image.startsWith('data:image')) {
      this.base64ImagesArray.push(obj);
    } else {
      this.setState(state => ({
        ...state,
        images: [...state.images, obj]
      }));
    }
  }

  async updateImageInImagesIndex(index, image){

    const res = await this.getImagesPromise() as any[];
    let images = [...res];
    images[index] = image;



    this.setState( state => {
      return {
        ...state,
        images: images
      }
    })
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

  setDocs(docs: any[]) {
    this.setState( state => ({
      ...state,
      docs: docs
    }));
  }

  addDocInDocs(doc: any) {
    this.setState( state => ({
      ...state,
      docs: [...state.docs, doc]
    }));
  }

  removeDocInDocsIndex(index){
    this.setState( state => {
      const docs = [...state.docs];
      docs.splice(index, 1);
      return {
        ...state,
        docs
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

  setLanguage(language: any) {
    this.setState( state => ({
      ...state,
      language: language
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
      keywords: keywords
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
      docs: [],
      price: 0,
      language_id: -1,
      language: null,
      keywords: [],
      terms: false
    }));
  }

  getId() {
    return this.selectState(state => state.id);
  }

  getIdPromise() {
    return new Promise((resolve, reject) => {
      this.selectState(state => state.id).subscribe((data) => {
        resolve(data);
      });
    });
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

  getDocs() {
    return this.selectState(state => state.docs);
  }

  getImagesPromise() {
    return new Promise((resolve, reject) => {
      this.selectState(state => state.images).subscribe((data) => {
        resolve(data);
      });
    });
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

  getFormData(){
    return this.selectState(state => state)
  }

  async getFormDataAsync(){
    return new Promise((resolve, reject) => {
      this.selectState(state => state).subscribe((data) => {
        resolve(data);
      });
    });

  }







}
