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
  photos: string[] = [];
  gmapsUrl = (lat: number, lon: number) => `https://maps.google.com/maps?q=${lat},${lon}&hl=bg&output=embed`;

  constructor(
    private MatDialog: MatDialog,
    ActivatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private SEOProvider: SEOProvider,
  ) {
    const { item } = ActivatedRoute.snapshot.data;
    delete item.photo
    console.log(item)
    try {
      this.photos = JSON.parse(item.photo);
    } catch {
      this.photos = [];
    }

    if (item.latitude && item.longitude) {
      this.locationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gmapsUrl(item.latitude, item.longitude));
    }

    const regex = /(&nbsp;|&ndash;|&bdquo;|&ldquo;|&rdquo;|<([^>]+)>)/ig
    const description = item.description.replace(regex, "");

    this.item = item;
    this.SEOProvider.set({
      title: `ЗНАНИЕ+ | ${item.name}`,
      description: item.name,
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: `https://www.znanieplus.bg/partner/${item.id}`,
      ogType: 'article',
      ogDescription: description,
      ogImage: `${Environment.api_url}/storage/${item.photo}`,
      canonicalURL: `/partner/${item.id}`
    });
  }

  ngOnInit() {
    window.addEventListener('resize', this.onResize.bind(this));
    setTimeout(() => {
      this.onResize()
    }, 100)
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize () {
    if (this.photos.length === 0) {
      return
    }
    const windowWidth = window.innerWidth;
    const galleryContainer = document.querySelector('.gallery-container');
    const reference = document.querySelector('.gallery-content');

    const page = document.querySelector('partner-page .container');
    const pageDimensions = page.getBoundingClientRect()

    const parentDimensions = reference.getBoundingClientRect();
    const containerHeight = parentDimensions.height;
    const containerWidth = parentDimensions.height * 1.6;

    const pageStyle = getComputedStyle(page)

    const pageOffset = Number(pageStyle.marginLeft.replace('px', ''));


    const totalWidth = pageDimensions.width - (pageOffset * 2)

    if (containerWidth >= pageDimensions.width) {
      galleryContainer.setAttribute('style', `width: ${totalWidth}px; height: ${totalWidth / 1.6}px;`);
    } else {
      galleryContainer.setAttribute('style', `width: ${containerWidth}px; height: ${containerHeight}px;`);

    }
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
