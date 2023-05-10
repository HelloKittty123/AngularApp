import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from '../type';
import { UserService } from 'src/service/user/user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';
import { NotificationService } from 'src/service/notification/notification.service';

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
  deleteId?: number | null;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'button'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private notifyService: NotificationService
  ) {}

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
    if (this.deleteId) {
      this.userService.deleteUser(this.deleteId).subscribe((res) => {
        this.deleteId = null;

        this.userService
          .getUserByPaging(this.pageIndex + 1)
          .subscribe((users) => {
            this.users = [...users];
            this.loadingStatus = 0;
            this.notifyService.showSuccess('Delete user success', 'Delete');
          });
      });
    }
  }

  ngOnInit(): void {
    this.userService.getUserByPaging(this.pageIndex + 1).subscribe((users) => {
      this.users = [...users];
      this.loadingStatus = 0;
    });
  }

  openDialog = (user: User): void => {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => console.log(result));
  };

  openEditDialog = (user: User): void => {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  };

  handlePageEvent = ($event: PageEvent) => {
    this.pageIndex = $event.pageIndex;
    this.loadingStatus = 1;
  };

  deleteUser = (id: number): void => {
    this.deleteId = id;
    this.loadingStatus = 1;
  };
}
