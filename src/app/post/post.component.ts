import { Component, DoCheck, OnInit } from '@angular/core';
import { PostItem } from '../type';
import { PostService } from 'src/service/post/post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts: PostItem[] = [];
  pageIndex: number = 0;
  prevPageIndex: number = 0;
  loadingStatus: number = 1;
  totalItem!: number;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostPaging(this.pageIndex).subscribe((posts) => {
      this.posts = [...posts.body!];
      this.loadingStatus = 0;
      this.totalItem = Number(posts.headers.get('X-Total-Count'));
    });
  }

  handlePageEvent = ($event: PageEvent) => {
    this.pageIndex = $event.pageIndex;
    this.loadingStatus = 1;
    this.postService.getPostPaging(this.pageIndex).subscribe((posts) => {
      this.posts = [...posts.body!];
      this.loadingStatus = 0;
      this.totalItem = Number(posts.headers.get('X-Total-Count'));
    });
  };
}
