import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Environment } from 'src/globals';
import { GalleryDialog } from 'src/app/shared/gallery-dialog';

@Component({
  selector: 'place-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlaceComponent {

  item: any;
  api_url = Environment.api_url;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private MatDialog: MatDialog,
  ) {
    const { item } = ActivatedRoute.snapshot.data;
    this.item = item;
  }

  openGallery() {
    this.MatDialog.open(GalleryDialog, {
      panelClass: 'gallery',
      backdropClass: 'black',
      autoFocus: false,
      data: {
        cover: this.item.cover,
        photos: this.item.photos
      }
    });
  }

}
