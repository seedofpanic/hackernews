import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NewsService} from "./services/news.service";
import {NewsListComponent} from "./news-list/news-list.component";
import {MatCardModule} from "@angular/material/card";
import {NewsItemComponent} from './news-item/news-item.component';
import {MatIconModule} from "@angular/material/icon";
import {TakeDomenPipe} from './pipes/take-domen.pipe';
import {MatButtonModule} from "@angular/material/button";
import {FromNowPipe} from './pipes/from-now.pipe';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  declarations: [NewsListComponent, NewsItemComponent, TakeDomenPipe, FromNowPipe],
  exports: [NewsListComponent],
  providers: [NewsService]
})
export class NewsModule {

}
