import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'footer-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {

  getDate() {
    const date = new Date();
    return date.getFullYear();
  }

}
