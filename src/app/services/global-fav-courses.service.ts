import { Injectable } from '@angular/core';


import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalFavCoursesModel {
  user_id: number;
  course_id: number;

}

export type GlobalFavCoursesModelState = Array<GlobalFavCoursesModel>;

@Injectable({
  providedIn: 'root'
})
export class GlobalFavCoursesService {

  constructor() { }
}
