import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren, HostListener, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Environment } from 'src/globals';

@Component({
  selector: 'gallery-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryDialog implements AfterViewInit{


  items: Array<{ name, type, mime }>
  index: number;
  
  api_url = Environment.api_url;
  @ViewChildren('images') images;

  constructor(
    private MatDialogRef: MatDialogRef<GalleryDialog>,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.items = this.data.photos;
    this.index = this.data.cover;
    console.log(data)
  }

  @HostListener('document:keydown.arrowright') handleRight() {
    this.move(true);
    this.scroll();
    return false;
  }

  @HostListener('document:keydown.arrowleft') handleLeft() {
    this.move(false);
    this.scroll();
    return false;
  }

  ngAfterViewInit(){
    this.scroll();
  }

  changeImage(index) {
    this.index = index;
    this.scroll();
    this.ChangeDetectorRef.markForCheck();
  }

  move(bool) {
    if (bool) {
      if (this.items.length - 1 > this.index) {
        this.index++;
      } else {
        this.index = 0;
      }
    } else {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.items.length - 1;
      }
    }
    this.ChangeDetectorRef.markForCheck();
  }

  close() {
    this.MatDialogRef.close();
  }

  scroll() {
    const element = this.getImage();
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  setFullScreen() {
    const element = this.getImage();

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  }

  getImage() {
    const images = this.images.toArray();
    const image = images[this.index];
    return image.nativeElement;
  }

}
