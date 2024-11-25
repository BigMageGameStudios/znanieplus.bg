import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild} from '@angular/core';
import {Environment} from 'src/globals';


type DirectionType = 'LEFT' | "RIGHT";
const DESKTOP_SCROLL_DISTANCE = 500

@Component({
  selector: 'scroller-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScrollerComponent {

  api_url = Environment.images_url;
  @Input('data') data: Array<any>;

  isMobile: boolean = false;
  current: number = 0;
  frameStep: number = 16;
  scrollLeft: number = 0;

  @ViewChild('list', {static: true}) list: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  scrollTo(distance: number, direction: DirectionType) {

    if (direction === 'LEFT') {
      this.scrollLeft -= this.frameStep;
      distance -= this.frameStep;
      if (distance <= 0) {
        return
      }
      this.list.nativeElement.scrollLeft -= this.frameStep
      requestAnimationFrame(this.scrollTo.bind(this, distance, direction));
    }
    if (direction === 'RIGHT') {
      this.scrollLeft += this.frameStep;
      distance -= this.frameStep;
      if (distance <= 0) {
        return
      }
      this.list.nativeElement.scrollLeft += this.frameStep
      requestAnimationFrame(this.scrollTo.bind(this, distance, direction));
    }


  }

  ngOnInit() {
    this.scrollLeft = this.list.nativeElement.scrollLeft
  }

  getOffset() {
    const elements = this.list.nativeElement.querySelectorAll('.scroll-item')
    const totalScrollWidth = this.list.nativeElement.scrollWidth;
    const currentScrollWidth = this.list.nativeElement.scrollLeft;
    const elementWidth = totalScrollWidth / elements.length
    const scrollOffsetRatio = parseInt(String(currentScrollWidth / elementWidth))

    return currentScrollWidth - (scrollOffsetRatio * elementWidth)

  }

  next() {
    const scrollOffset = this.getOffset()
    const element = this.list.nativeElement.querySelector('.scroll-item')
    const dimensions = element.getBoundingClientRect()
    let distance = this.isMobile ? dimensions.width + 26 - scrollOffset : DESKTOP_SCROLL_DISTANCE - scrollOffset;
    if (distance <= this.frameStep) {
      distance = dimensions.width + 26
    }

    this.scrollTo(distance, 'RIGHT')
  }

  prev() {
    const scrollOffset = this.getOffset()
    const element = this.list.nativeElement.querySelector('.scroll-item')
    const dimensions = element.getBoundingClientRect()


    let distance = this.isMobile ? scrollOffset + 26 : DESKTOP_SCROLL_DISTANCE - scrollOffset;
    if (distance <= this.frameStep) {
      distance = dimensions.width + 26
    }
    this.scrollTo(distance, 'LEFT')

  }


  track(index, item) {
    return item._id;
  }


}
