import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'company-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyComponent {

  api_url = Environment.api_url;
  @Input('company') company;

  constructor() { }

}
