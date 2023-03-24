import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Environment } from 'src/globals';
import { GalleryDialog } from 'src/app/shared/gallery-dialog';
import { SEOProvider } from 'src/app/providers';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'partner-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnerComponent {

  item: any;
  api_url = Environment.api_url;
  locationUrl!: SafeUrl;
  gmapsUrl = (lat: number, lon: number) => `https://maps.google.com/maps?q=${lat},${lon}&hl=bg&output=embed`;

  constructor(
    private MatDialog: MatDialog,
    ActivatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private SEOProvider: SEOProvider
  ) {
    const { item } = ActivatedRoute.snapshot.data;

    if(item.latitude && item.longitude){
      this.locationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gmapsUrl(item.latitude, item.longitude));
    }

    this.item = item;
    this.SEOProvider.set({
      title: `ЗНАНИЕ+ | ${item.name}`,
      description: item.address,
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: `https://www.znanieplus.bg/partner/${item.id}`,
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
