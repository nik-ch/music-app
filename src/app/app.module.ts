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
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SortingComponent } from './components/common/sorting-component/sorting.component';

@NgModule({
  declarations: [
    AppComponent,
    ReleaseListComponent,
    ReleaseCardComponent,
    InfiniteScrollDirective,
    SortingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ReleaseListApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
