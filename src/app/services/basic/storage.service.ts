import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, data: string): Promise<boolean>{

    return new Promise( resolve => {

      localStorage.setItem(key, data);
      resolve(true);

    });

  }

  get(key: string): Promise<any>{

    return new Promise( resolve => {

      const data = localStorage.getItem(key);
      resolve(data);

    });

  }

}
