import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReleaseListComponent } from './components/release-list/release-list.component';
import { ReleaseListApiService } from './services/release-list.apiservice';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { ReleaseCardComponent } from './components/release-list/release-card/release-card.component';
import { InfiniteScrollDirective } from './directives/common/infinite-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    ReleaseListComponent,
    ReleaseCardComponent,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ReleaseListApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
