import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectorRef, ElementRef, HostListener, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { UserProvider } from 'src/app/providers';

@Component({
  selector: 'drawer-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DrawerComponent {

  readonly buttonTypes = {
    link: {
      key: 'link'
    },
    button: {
      key: 'button'
    }
  }

  active = false;

  activeFragment = false;
  activeRoute = 'home';
  subscription!: Subscription;

  @Output('toggle') toogleEvent = new EventEmitter();
  @ViewChild('container', { static: true }) container!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private change: ChangeDetectorRef,
    private activated: ActivatedRoute,
    public userProvider: UserProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.activated.fragment.subscribe((data) => {
        this.activeRoute = data;
        this.change.markForCheck();
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  toggle(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.active = !this.active;
    if (this.active) {
      this.elementRef.nativeElement.classList.add('active');
    } else {
      this.elementRef.nativeElement.classList.remove('active')
    }
    this.toogleEvent.emit();
    this.change.markForCheck();
  }

  handler(child: IObjectKeys){
    child?.click();
    this.toggle();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: MouseEvent) {
    const clickedInside = this.container.nativeElement.contains(targetElement);
    if (!clickedInside && this.active) {
      this.toggle();
    }
  }

  refresh(){
    this.change.markForCheck();
  }

  removeFragment() {
    this.activeRoute = null;
    this.change.markForCheck();
  }
  
  track(index: number, item: IObjectKeys) {
    return index;
  }

}
