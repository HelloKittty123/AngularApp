import { Component, OnInit } from '@angular/core';
import { Role, User } from '../type';
import { UserService } from 'src/service/user/user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailDialogComponent } from '../dialog/user-detail-dialog/user-detail-dialog.component';
import { NotificationService } from 'src/service/notification/notification.service';
import { UserUpdateDialogComponent } from '../dialog/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  pageIndex: number = 0;
  loadingStatus: number = 1;
  deleteId?: number | null;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'button'];
  totalItem!: number;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService.getUserByPaging(this.pageIndex + 1).subscribe((users) => {
      this.users = [...users.body!];
      this.loadingStatus = 0;
      this.totalItem = Number(users.headers.get('X-Total-Count'));
    });
  }

  openDialog = (user: User): void => {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  };

  openEditDialog = (user?: User): void => {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.loadingStatus = 1;
        if (result.isCreate) {
          this.userService.createUser(result).subscribe(() => {
            this.userService
              .getUserByPaging(this.pageIndex + 1)
              .subscribe((users) => {
                this.users = [...users.body!];
                this.totalItem = Number(users.headers.get('X-Total-Count'));
                this.loadingStatus = 0;
                this.notifyService.showSuccess('Create user success', 'Create');
              });
          });
        } else {
          this.userService.updateUser(result).subscribe(() => {
            this.userService
              .getUserByPaging(this.pageIndex + 1)
              .subscribe((users) => {
                this.users = [...users.body!];
                this.loadingStatus = 0;
                this.notifyService.showSuccess('Update user success', 'Update');
              });
          });
        }
      }
    });
  };

  handlePageEvent = ($event: PageEvent) => {
    this.pageIndex = $event.pageIndex;
    this.loadingStatus = 1;
    this.userService.getUserByPaging(this.pageIndex + 1).subscribe((users) => {
      this.users = [...users.body!];
      this.loadingStatus = 0;
    });
  };

  deleteUser = (id: number): void => {
    this.deleteId = id;
    this.loadingStatus = 1;
    this.userService.deleteUser(this.deleteId).subscribe((res) => {
      this.deleteId = null;

      this.userService
        .getUserByPaging(this.pageIndex + 1)
        .subscribe((users) => {
          this.users = [...users.body!];
          this.loadingStatus = 0;
          this.totalItem = Number(users.headers.get('X-Total-Count'));
          this.notifyService.showSuccess('Delete user success', 'Delete');
        });
    });
  };
}
