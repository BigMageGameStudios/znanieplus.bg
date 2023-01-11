import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'home-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  appartments: any[];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private SEOProvider: SEOProvider
  ) {
    const apartments = this.ActivatedRoute.snapshot.data.result.data.data;
    this.appartments = apartments;
    this.SEOProvider.set({
      title: 'Знание плюс',
      description: '',
      keywords: '',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: '.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: '/'
    });
  }

}