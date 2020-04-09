import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {NewsModule} from "./news/news.module";
import {HttpClientModule} from "@angular/common/http";
import {FireBaseService} from "./services/fire-base.service";
import {MomentService} from "./services/moment.service";
import {PageModule} from "./page/page.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    NewsModule,
    HttpClientModule,
    PageModule
  ],
  providers: [
    MomentService,
    FireBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
