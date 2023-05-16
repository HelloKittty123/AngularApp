import { PostService } from 'src/service/post/post.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CommentItem, PostItem } from '../type';
import { CommentService } from 'src/service/comment/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLeaveDialogComponent } from '../confirm-leave-dialog/confirm-leave-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  post!: PostItem;
  comments: CommentItem[] = [];
  loadingStatus: number = 1;
  commentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      name: [
        '',
        {
          nonNullable: true,
          validators: Validators.compose([Validators.required]),
        },
      ],
      email: [
        '',
        {
          nonNullable: true,
          validators: Validators.compose([Validators.required]),
        },
      ],
      body: [
        '',
        {
          nonNullable: true,
          validators: Validators.compose([Validators.required]),
        },
      ],
    });

    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostItem(postId).subscribe((post) => {
      this.post = { ...post };

      this.commentService.getComment(postId).subscribe((comments) => {
        this.comments = [...comments];
        this.loadingStatus = 0;
      });
    });
  }

  isEdit = (): boolean => {
    return !!Object.values(this.commentForm.value).filter((val) => val !== '')
      .length;
  };

  openLeaveDialog = (): Observable<boolean> => {
    const dialogRef = this.dialog.open(ConfirmLeaveDialogComponent);

    return dialogRef.afterClosed();
  };

  submit = (): void => {
    const comment: CommentItem = {
      postId: this.post.id,
      name: this.commentForm.value.name,
      email: this.commentForm.value.email,
      body: this.commentForm.value.body,
    };

    this.loadingStatus = 1;

    this.commentService.postComment(comment).subscribe((comment) =>
      this.commentService.getComment(this.post.id).subscribe((comments) => {
        this.comments = [...comments];
        this.commentForm.reset({
          name: '',
          email: '',
          body: '',
        });

        console.log(this.commentForm);

        this.loadingStatus = 0;
      })
    );
  };

  backControl = () => {
    this.location.back();
  };
}
