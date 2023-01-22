import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'gallery-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryComponent {

  @Input('src') src: string;

  constructor() {}

}
