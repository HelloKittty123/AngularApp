import { Component, OnInit } from '@angular/core';
import { AlbumItem } from '../type';
import { AlbumService } from 'src/service/album/album.service';
import { UserService } from 'src/service/user/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  pageIndex: number = 0;
  dataSource: { id: number; author: string; albums: AlbumItem[] }[] = [];
  displayedColumns: string[] = ['id', 'author', 'albums'];
  loadingStatus: number = 1;
  totalItem!: number;

  constructor(
    private albumService: AlbumService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserByPaging(this.pageIndex + 1).subscribe((users) => {
      this.totalItem = Number(users.headers.get('X-Total-Count'));
      users.body!.forEach((user) =>
        this.albumService.getAlbumsByUserId(user.id).subscribe((albums) => {
          this.dataSource = [
            ...this.dataSource,
            { id: user.id, author: user.name, albums: albums },
          ];

          this.loadingStatus = 0;
        })
      );
    });
  }

  handlePageEvent = ($event: PageEvent) => {
    this.pageIndex = $event.pageIndex;
    this.loadingStatus = 1;
    this.userService.getUserByPaging(this.pageIndex + 1).subscribe((users) => {
      this.totalItem = Number(users.headers.get('X-Total-Count'));
      users.body!.forEach((user) =>
        this.albumService.getAlbumsByUserId(user.id).subscribe((albums) => {
          this.dataSource = [
            ...this.dataSource,
            { id: user.id, author: user.name, albums: albums },
          ];

          this.loadingStatus = 0;
        })
      );
    });
  };
}
