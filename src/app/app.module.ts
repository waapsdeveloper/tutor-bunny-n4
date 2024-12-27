import { CUSTOM_ELEMENTS_SCHEMA, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import { SharedSqliteModule } from './services/sqlite/shared-sqlite/shared-sqlite.module';
import { SwiperModule } from 'swiper/angular';
import { provideNgSimpleState } from 'ng-simple-state';
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    AppRoutingModule,
    HttpClientModule,
    NgxPubSubModule,
    SharedSqliteModule,
    SwiperModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideNgSimpleState({
      enableDevTool: isDevMode(),
      enableLocalStorage: true,
      persistentStorage: 'local'
    })

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
