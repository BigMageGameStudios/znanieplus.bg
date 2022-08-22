import { Component, ViewChild, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'gallery-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryComponent {

  @Input('src') src: string;
  @ViewChild('image', { static: true }) image: ElementRef;

  constructor() {

  }

  onImageLoad() {
    const classlist = this.image.nativeElement.classList;
    classlist.add('loaded')
  }

}
