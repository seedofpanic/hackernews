import {Component, OnInit} from '@angular/core';
import {NewsService} from "../services/news.service";
import {take} from "rxjs/operators";
import {NewsItem} from "../models/newsItem";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  newsIds: number[];
  hidden: { [name: string]: boolean } = {};

  constructor(public newsService: NewsService) {
  }

  ngOnInit() {
    this.refreshNewsList();
  }

  private refreshNewsList() {
    this.newsService.getNewsListIds()
      .then(newsIds => {
        this.newsIds = newsIds;
        this.newsService.loadNewsItems(newsIds);
      });
  }

  trackBy(index: number, id: number) {
    return id;
  }

  onHide(id: number) {
    this.hidden[id] = true;
  }
}
