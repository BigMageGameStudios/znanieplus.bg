import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Types } from 'src/globals';
import { User } from 'src/app/models/user';
import { Apartment } from 'src/app/models/apartment';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'home-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  appartments: Apartment[];
  teamData: User[];
  types = Types;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private SEOProvider: SEOProvider
  ) {
    const { apartments, users } = this.ActivatedRoute.snapshot.data.result;
    this.appartments = apartments;
    this.teamData = users;
    this.SEOProvider.set({
      title: 'Квадратен метър - Обяви за Недвижими Имоти - Продажби, Наеми, Нови сгради',
      description: 'Обяви за Недвижими Имоти. Продажби, под наем, имоти в строеж. Средни цени на имоти',
      keywords: 'агенция,недвижими имоти,продажби на имоти,наем на имоти,наем,продажба',
      ogUrl: 'https://www.kvadratenmetar.bg',
      ogType: 'article',
      ogDescription: 'Обяви за Недвижими Имоти. Продажби, под наем, имоти в строеж. Средни цени на имоти.',
      ogImage: 'https://www.kvadratenmetar.bg/assets/images/logo.png',
      canonicalURL: '/'
    });
  }

}
