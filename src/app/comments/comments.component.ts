import { PostService } from 'src/service/post/post.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentItem, PostItem } from '../type';
import { CommentService } from 'src/service/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  post!: PostItem;
  comments: CommentItem[] = [];
  loadingStatus: number = 1;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostItem(postId).subscribe((post) => {
      this.post = { ...post };

      this.commentService.getComment(postId).subscribe((comments) => {
        this.comments = [...comments];
      });
      this.loadingStatus = 0;
    });
  }

  backControl = () => {
    this.location.back();
  };
}
