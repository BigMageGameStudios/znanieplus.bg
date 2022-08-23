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

  appartments: Apartment[] = [
    {
      _id: "5cfce0b8b665e212ad41598e",
      city: 'София',
      address: 'ул. Михаил Буботинов 32, бл. 5 ж.к. И. Вазов',
      floor: '4',
      type: '3-стаен апартамент',
      construction: 'тухла',
      year: '2000',
      quadrature: 100,
      price: 10,
      m2price: 10,
      currency: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus a eros sit amet vehicula. Aliquam vel fermentum nunc. Vivamus eu ultrices lacus. Sed interdum suscipit efficitur. Sed vel vehicula metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n' +
        '\n' +
        'Proin maximus, ante non commodo convallis, nibh tellus hendrerit justo, ut rhoncus nibh leo ut odio. Nulla tristique nibh quis urna molestie porttitor. In eu nulla id diam tristique lacinia quis a quam. Duis hendrerit eget justo sit amet accumsan. Praesent mi est, placerat non massa sit amet, euismod luctus massa.\n' +
        '\n' +
        'Aliquam dignissim vehicula nulla, a cursus libero elementum quis. Quisque et enim felis. Donec viverra eu lorem quis posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras commodo quam mauris, at pellentesque velit consectetur sed.',
      act16: true,
      active: true,
      cover: 0,
      key: 19,
      createdAt: "2019-06-09T10:34:32.705Z",
      updatedAt: "2019-06-14T07:41:37.746Z",
      photos: [
        {
          name: '2.jpg',
          type: 1,
          mime: 'image/png'
        }
      ],
      apartmentType: 1,
      ownerEmail: '3asd@sd.sd',
      ownerName: '2',
      ownerPhone: '3asd@sd.sd'
    },
    {
      _id: "5cfce5f7083aa622d666e18a",
      city: 'София',
      address: 'ул. Михаил Танев 11, бл. 22 ж.к. И. Вазов',
      floor: '1',
      type: '5-стаен апартамент',
      construction: 'тухла',
      year: '1978',
      quadrature: 50,
      price: 11,
      m2price: 500,
      currency: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus a eros sit amet vehicula. Aliquam vel fermentum nunc. Vivamus eu ultrices lacus. Sed interdum suscipit efficitur. Sed vel vehicula metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n' +
        '\n' +
        'Proin maximus, ante non commodo convallis, nibh tellus hendrerit justo, ut rhoncus nibh leo ut odio. Nulla tristique nibh quis urna molestie porttitor. In eu nulla id diam tristique lacinia quis a quam. Duis hendrerit eget justo sit amet accumsan. Praesent mi est, placerat non massa sit amet, euismod luctus massa.\n' +
        '\n' +
        'Aliquam dignissim vehicula nulla, a cursus libero elementum quis. Quisque et enim felis. Donec viverra eu lorem quis posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras commodo quam mauris, at pellentesque velit consectetur sed.',
      act16: true,
      active: true,
      cover: 0,
      key: 20,
      createdAt: "2019-06-09T10:56:55.428Z",
      updatedAt: "2019-06-14T07:41:28.081Z",
      photos: [
        {
          name: '6.jpeg',
          type: 1,
          mime: 'image/png'
        }
      ],
      apartmentType: 1,
      ownerEmail: 'asd@sd.sd',
      ownerName: '1',
      ownerPhone: '2'
    },
    {
      _id: "5cfcf8999ddf3e414ee6b3f1",
      city: 'София',
      address: 'Атанас Иширков 33',
      floor: '1',
      type: '2-стаен апартамент',
      construction: 'тухла',
      year: '2012',
      quadrature: 78,
      price: 12,
      m2price: 50,
      currency: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus a eros sit amet vehicula. Aliquam vel fermentum nunc. Vivamus eu ultrices lacus. Sed interdum suscipit efficitur. Sed vel vehicula metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n' +
        '\n' +
        'Proin maximus, ante non commodo convallis, nibh tellus hendrerit justo, ut rhoncus nibh leo ut odio. Nulla tristique nibh quis urna molestie porttitor. In eu nulla id diam tristique lacinia quis a quam. Duis hendrerit eget justo sit amet accumsan. Praesent mi est, placerat non massa sit amet, euismod luctus massa.\n',
      act16: true,
      active: true,
      cover: 0,
      key: 21,
      createdAt: "2019-06-09T12:16:25.240Z",
      updatedAt: "2019-06-14T07:41:21.797Z",
      photos: [
        {
          name: '3.jpg',
          type: 1,
          mime: 'image/png'
        },
      ],
      apartmentType: 1,
      ownerEmail: 'asd@asd.ds',
      ownerName: '1',
      ownerPhone: '2'
    },
    {
      _id: "5cfcf8999ddf3e414ee6b3f1",
      city: 'София',
      address: 'Атанас Иширков 33',
      floor: '1',
      type: '2-стаен апартамент',
      construction: 'тухла',
      year: '2012',
      quadrature: 78,
      price: 13,
      m2price: 50,
      currency: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus a eros sit amet vehicula. Aliquam vel fermentum nunc. Vivamus eu ultrices lacus. Sed interdum suscipit efficitur. Sed vel vehicula metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n' +
        '\n' +
        'Proin maximus, ante non commodo convallis, nibh tellus hendrerit justo, ut rhoncus nibh leo ut odio. Nulla tristique nibh quis urna molestie porttitor. In eu nulla id diam tristique lacinia quis a quam. Duis hendrerit eget justo sit amet accumsan. Praesent mi est, placerat non massa sit amet, euismod luctus massa.\n',
      act16: true,
      active: true,
      cover: 0,
      key: 21,
      createdAt: "2019-06-09T12:16:25.240Z",
      updatedAt: "2019-06-14T07:41:21.797Z",
      photos: [
        {
          name: '4.jpg',
          type: 1,
          mime: 'image/png'
        },
      ],
      apartmentType: 1,
      ownerEmail: 'asd@asd.ds',
      ownerName: '1',
      ownerPhone: '2'
    }, 
    {
      _id: "5cfcf8999ddf3e414ee6b3f1",
      city: 'София',
      address: 'Атанас Иширков 33',
      floor: '1',
      type: '2-стаен апартамент',
      construction: 'тухла',
      year: '2012',
      quadrature: 78,
      price: 14,
      m2price: 50,
      currency: 2,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus a eros sit amet vehicula. Aliquam vel fermentum nunc. Vivamus eu ultrices lacus. Sed interdum suscipit efficitur. Sed vel vehicula metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n' +
        '\n' +
        'Proin maximus, ante non commodo convallis, nibh tellus hendrerit justo, ut rhoncus nibh leo ut odio. Nulla tristique nibh quis urna molestie porttitor. In eu nulla id diam tristique lacinia quis a quam. Duis hendrerit eget justo sit amet accumsan. Praesent mi est, placerat non massa sit amet, euismod luctus massa.\n',
      act16: true,
      active: true,
      cover: 0,
      key: 21,
      createdAt: "2019-06-09T12:16:25.240Z",
      updatedAt: "2019-06-14T07:41:21.797Z",
      photos: [
        {
          name: 'images.jpeg',
          type: 1,
          mime: 'image/png'
        },
      ],
      apartmentType: 1,
      ownerEmail: 'asd@asd.ds',
      ownerName: '1',
      ownerPhone: '2'
    }
  ].map((item) => new Apartment(item as any));
  types = Types;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private SEOProvider: SEOProvider
  ) {
    const { apartments, users } = this.ActivatedRoute.snapshot.data.result;
    // this.appartments = apartments;
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
