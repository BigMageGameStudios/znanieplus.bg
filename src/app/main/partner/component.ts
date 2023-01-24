import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Environment } from 'src/globals';
import { GalleryDialog } from 'src/app/shared/gallery-dialog';
import { SEOProvider } from 'src/app/providers';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'partner-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnerComponent {

  item: any;
  api_url = Environment.api_url;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private MatDialog: MatDialog,
    private SEOProvider: SEOProvider
  ) {
    const { item } = ActivatedRoute.snapshot.data;
    this.item = item;
    this.SEOProvider.set({
      title: `Знание плюс | ${item.name}`,
      description: item.address,
      keywords: 'знание,карта,отстъпка,култура,социална придобивка',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: item.address,
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: `/partner/${item.id}`
    });
  }

  openGallery() {
    this.MatDialog.open(GalleryDialog, {
      panelClass: 'gallery',
      backdropClass: 'black',
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      data: {
        photos: [{ name: this.item.photo }],
        cover: 0
      }
    });
  }

}
