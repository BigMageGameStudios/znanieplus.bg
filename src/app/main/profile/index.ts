import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { SafeHTMLModule } from 'src/app/pipes/safe-html';
import { MatRippleModule } from '@angular/material/core';
import { PromoProvider } from '../providers';
import { UserProvider } from 'src/app/providers';
import {MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [
     ProfileComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ 
            path: '', 
            component: ProfileComponent,
            resolve: {
                codes: () => {
                    const promoProvider = inject(PromoProvider);
                    const userProvider = inject(UserProvider);
                    return promoProvider.get(userProvider.getCode());
                }
            }
        }]),
        ContactsModule,
        SafeHTMLModule,
        MatRippleModule,
        MatListModule
    ]
})

export class ProfileModule { }
