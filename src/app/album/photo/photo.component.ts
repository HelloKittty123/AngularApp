import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/service/album/album.service';
import { PhotoService } from 'src/service/photo/photo.service';
import { ActivatedRoute } from '@angular/router';
import { AlbumItem, PhotoItem } from 'src/app/type';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  album!: AlbumItem;
  photos: PhotoItem[] = [];
  loadingStatus: number = 1;

  constructor(
    private photoService: PhotoService,
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.getAlbumById(albumId).subscribe((album) => {
      this.album = { ...album };
      this.photoService.getPhotoByAlbumId(albumId).subscribe((photos) => {
        this.photos = [...photos];
        this.loadingStatus = 0;
      });
    });
  }
}
