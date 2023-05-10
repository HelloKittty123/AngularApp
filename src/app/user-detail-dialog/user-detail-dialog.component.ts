import { Component, Inject, DoCheck } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tile, User } from '../type';
import { convertObjectToString } from 'src/utils/common';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss'],
})
export class UserDetailDialogComponent implements DoCheck {
  tiles?: Tile[];

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngDoCheck(): void {
    this.tiles = Object.entries(this.data).map((value) => {
      return {
        cols: 3,
        rows: 1,
        text: `${value[0]}: ${
          typeof value[1] === 'object'
            ? convertObjectToString(value[1])
            : value[1]
        }`,
      };
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
