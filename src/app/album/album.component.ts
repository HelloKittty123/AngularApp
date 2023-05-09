import { Component, OnInit } from '@angular/core';
import { AlbumItem } from '../type';
import { AlbumService } from 'src/service/album/album.service';
import { UserService } from 'src/service/user/user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  pageIndex: number = 1;
  dataSource: { id: number; author: string; albums: AlbumItem[] }[] = [];
  displayedColumns: string[] = ['id', 'author', 'albums'];
  loadingStatus: number = 1;

  constructor(
    private albumService: AlbumService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserByPaging(this.pageIndex).subscribe((users) =>
      users.forEach((user) =>
        this.albumService.getAlbumsByUserId(user.id).subscribe((albums) => {
          this.dataSource = users.map((user) => {
            return { id: user.id, author: user.name, albums: albums };
          });
          this.loadingStatus = 0;
        })
      )
    );
  }
}
