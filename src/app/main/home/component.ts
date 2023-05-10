import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject, ViewChild, ElementRef, OnInit, PLATFORM_ID, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from 'src/app/modules/window';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'home-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit{

  private SEOProvider= inject(SEOProvider);
  private ActivatedRoute= inject(ActivatedRoute);
  private window: Window = inject(WINDOW);
  private platform: Object = inject(PLATFORM_ID);
  @Input() media: any;

  items: any[];
  videoUrl = this.window?.screen?.width < 800 ? '/assets/video/banner-mobile.mp4' : `/assets/video/banner-desktop.mp4`;
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement>;

  constructor(
 
  ) {
    const items = this.ActivatedRoute.snapshot.data.result.data.data;
    this.items = items;
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: '/'
    });

  }

  ngOnInit() {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.loop = true;
    this.video.nativeElement.playsInline = true;
    this.video.nativeElement.controls = false;
    this.video.nativeElement.preload = 'none';
    this.video.nativeElement.src = this.videoUrl;
    if(isPlatformBrowser(this.platform)){
      this.video.nativeElement.play().catch((e) => console.log(e));
    }
  }

}