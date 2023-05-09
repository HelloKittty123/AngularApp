import { Component, DoCheck, OnInit } from '@angular/core';
import { PostItem } from '../type';
import { PostService } from 'src/service/post/post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, DoCheck {
  posts: PostItem[] = [];
  pageIndex: number = 0;
  prevPageIndex: number = 0;
  loadingStatus: number = 1;

  constructor(private postService: PostService) {}

  ngDoCheck(): void {
    if (this.prevPageIndex !== this.pageIndex) {
      this.prevPageIndex = this.pageIndex;
      this.postService.getPostPaging(this.pageIndex).subscribe((posts) => {
        this.posts = [...posts];
        this.loadingStatus = 0;
      });
    }
  }

  ngOnInit(): void {
    this.postService.getPostPaging(this.pageIndex).subscribe((posts) => {
      this.posts = [...posts];
      this.loadingStatus = 0;
    });
  }

  handlePageEvent = ($event: PageEvent) => {
    this.pageIndex = $event.pageIndex;
    this.loadingStatus = 1;
  };
}