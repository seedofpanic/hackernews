import {Injectable} from '@angular/core';
import {FireBaseService} from "../../services/fire-base.service";
import {database} from "firebase/app";
import {NewsItem} from "../models/newsItem";

@Injectable()
export class NewsService {
  db: database.Database;
  items: { [name: string]: NewsItem } = {};

  constructor(private fireBaseService: FireBaseService) {
    this.fireBaseService.doInitializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com'
    });

    this.db = this.fireBaseService.getDatabase();
  }

  getNewsListIds() {
    return this.db.refFromURL('https://hacker-news.firebaseio.com/v0/topstories')
      .once('value')
      .then(data => data.val());
  }

  loadNewsItems(ids: number[]) {
    ids.forEach(id => {
      this.loadNewsItem(id)
        .then(item => {
          this.items[id] = item;
        });
    });
  }

  private loadNewsItem(id: number) {
    return this.db.refFromURL(`https://hacker-news.firebaseio.com/v0/item/${id}`)
      .once('value')
      .then(data => data.val());
  }
}
