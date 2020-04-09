import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsItem} from "../models/newsItem";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() item: NewsItem;
  @Output() hide = new EventEmitter<void>();
  liked: boolean;
  showMore: boolean;
  isHidden: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  setLiked() {
    this.liked = !this.liked;
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }

  hideItem() {
    this.hide.emit();
  }
}
