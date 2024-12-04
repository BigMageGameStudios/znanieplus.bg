import {inject, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {ClipboardModule} from '@angular/cdk/clipboard';

import {ProfileComponent} from './component';
import {ContactsModule} from 'src/app/shared/contacts-component';
import {SafeHTMLModule} from 'src/app/pipes/safe-html';
import {MatRippleModule} from '@angular/material/core';
import {CardProvider, PromoProvider} from '../providers';
import {UserProvider} from 'src/app/providers';
import {MatListModule} from '@angular/material/list';
import {ConfirmDialogModule} from '../../shared/confirm-dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FooterModule} from 'src/app/shared/footer-component';
import {IObjectKeys} from 'src/app/helpers/interfaces';
import {forkJoin, map} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {CancelSubscriptionDialog} from "./dialog";

@NgModule({
  declarations: [
    ProfileComponent,
    CancelSubscriptionDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProfileComponent,
      resolve: {
        result: () => {
          const promoProvider = inject(PromoProvider);
          const userProvider = inject(UserProvider);
          const cardrovider = inject(CardProvider);
          const router = inject(Router);

          const token = userProvider.getCode();

          if (!token) {
            router.navigateByUrl('/login-input');
            return false;
          }

          return forkJoin([
            promoProvider.get(userProvider.getCode()),
            cardrovider.get(token).pipe(map((result: IObjectKeys) => {
              if (result.active) {
                return result;
              }
              router.navigateByUrl('/login-input');
              return false;
            }))
          ]);
        }
      }
    }]),
    ContactsModule,
    SafeHTMLModule,
    MatRippleModule,
    MatListModule,
    ConfirmDialogModule,
    MatDialogModule,
    ClipboardModule,
    MatSnackBarModule,
    FooterModule,
    FormsModule,
    MatButtonModule
  ]
})

export class ProfileModule {
}
