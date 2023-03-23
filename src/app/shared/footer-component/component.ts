import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserProvider } from 'src/app/providers';

@Component({
  selector: 'footer-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {

  constructor(public userProvider: UserProvider) { }

  getDate() {
    const date = new Date();
    return date.getFullYear();
  }

}
