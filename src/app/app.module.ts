import { NgModule, isDevMode } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material-module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { GoogleMapsModule } from '@angular/google-maps';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,NgbCollapseModule
    // , MatTableExporterModule
    ,MaterialModule, 
    GoogleMapsModule,
     NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
     TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: !isDevMode(),
       registrationStrategy: 'registerWhenStable:30000'
     }),
     ToastrModule.forRoot(),

    //  ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    // }),
    //  NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
  ],
  providers: [provideHttpClient(),{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  // providers: [DatePipe, { provide: APP_BASE_HREF, useValue: '/mdang/' }, provideHttpClient(withInterceptorsFromDi())] })
  bootstrap: [AppComponent]
})
export class AppModule { }
