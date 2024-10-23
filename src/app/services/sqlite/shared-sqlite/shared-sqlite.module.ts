import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitializeAppService } from '../initialize.app.service';
import { StorageService } from '../storage.service';
import { DbnameVersionService } from '../dbname-version.service';
import { UserSqService } from '../user-sq.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    InitializeAppService,
    StorageService,
    DbnameVersionService,
    UserSqService
  ]
})
export class SharedSqliteModule { }
