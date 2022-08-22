import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { intersectionObserver } from './intersection-observer';

@Component({
  selector: 'lazy-image-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LazyImageComponent implements AfterViewInit {

  @Input('src') src: string;
  @Input('width') width: string;
  @Input('height') height: string;
  @Input('objectFit') objectFit: string;

  @ViewChild('container') container: ElementRef;

  ngAfterViewInit() {

    const style = this.container.nativeElement.style;
    style.width = this.width;
    style.height = this.height;

    intersectionObserver.observe(this.container.nativeElement, this.loaded.bind(this)).catch(() => {
      this.loaded();
    });

  }

  loaded() {

    const img = new Image();
    img.src = this.src;
    img.alt = 'lazy load image';
    img.style.objectFit = this.objectFit;
    img.style.width = this.width;
    img.style.height = this.height;

    this.container.nativeElement.appendChild(img);
  }

}
