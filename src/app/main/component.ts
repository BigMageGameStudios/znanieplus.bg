import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject } from '@angular/core';
import { fadeAnimation } from '../helpers/animations';
import { MatDialog } from '@angular/material/dialog';
import { OfferDialog } from '../shared/offer-dialog';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'main-page',
  styleUrls: ['style.scss'],
  animations: [fadeAnimation],
  templateUrl: 'index.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent {

  dialogs = {
    offer: 'offer'
  }

  router = inject(Router);
  dialog = inject(MatDialog);
  activatedRoute = inject(ActivatedRoute);
  hideOffer: boolean = false;

  constructor() {

    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.hideOffer = !value.url.startsWith('/companies')
      }
    })


    this.activatedRoute.queryParams.subscribe((params) => {
      this.check(params);
    });

  }

  check(params: Params) {
    switch (params.dialog) {
      case (this.dialogs.offer): {
        this.openDialog();
        break;
      }
    }
  }

  openDialog() {
    this.dialog.open(OfferDialog).afterClosed().subscribe(() => {
      this.router.navigate([], {
        state: {
          disableScroll: true
        },
        replaceUrl: true,
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge',
        queryParams: {
          dialog: null
        }
      })
    });
  }

}
