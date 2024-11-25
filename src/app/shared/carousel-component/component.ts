import {Component, ViewChild, Input, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import {Environment} from "../../../globals";
import {fadeAnimation} from "../../helpers/animations";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'carousel-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0, transform: 'translateX(-30px)'}),
            animate('0.3s ease-out',
              style({opacity: 1, transform: 'translateX(0px)'}),
            )
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1, transform: 'translateX(0px)'}),
            animate('0.3s ease-in',
              style({opacity: 0, transform: 'translateX(30px)'}))
          ]
        )
      ]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarouselComponent {
  api_url = Environment.api_url;
  current: number = 0
  show: boolean = false
  selected: string = '';
  hasNext: boolean = false;
  hasPrev: boolean = false;
  @Input('photos') photos: string[];

  constructor() {}

  ngOnInit() {
    this.hasNext = this.photos.length > 1
  }

  onNext() {
    if (this.photos[this.current + 1]) {
      this.current += 1
      this.selected = this.photos[this.current];
      this.hasNext = !!this.photos[this.current + 1];
      this.hasPrev = !!this.photos[this.current - 1];
    }
  }

  onPrev() {
    if (this.photos[this.current - 1]) {
      this.current -= 1
      this.selected = this.photos[this.current];
      this.hasNext = !!this.photos[this.current + 1];
      this.hasPrev = !!this.photos[this.current - 1];
    }

  }
}
