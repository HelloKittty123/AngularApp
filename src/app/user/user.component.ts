import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from '../type';
import { UserService } from 'src/service/user/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, DoCheck {
  users: User[] = [];
  pageIndex: number = 0;
  prevPageIndex: number = 0;
  loadingStatus: number = 1;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];

  constructor(private userService: UserService) {}

  ngDoCheck(): void {
    if (this.prevPageIndex !== this.pageIndex) {
      this.prevPageIndex = this.pageIndex;
      this.userService
        .getUserByPaging(this.pageIndex + 1)
        .subscribe((users) => {
          this.users = [...users];
          this.loadingStatus = 0;
        });
    }
  }

  ngOnInit(): void {
    this.userService.getUserByPaging(this.pageIndex + 1).subscribe((users) => {
      this.users = [...users];
      this.loadingStatus = 0;
    });
  }

  handlePageEvent = ($event: PageEvent) => {
    this.pageIndex = $event.pageIndex;
    this.loadingStatus = 1;
  };
}
