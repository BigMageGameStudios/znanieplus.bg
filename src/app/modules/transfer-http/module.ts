import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferHttpCacheInterceptor } from './interceptor';

@NgModule({
    imports: [],
    providers: [
        TransferHttpCacheInterceptor,
        { provide: HTTP_INTERCEPTORS, useExisting: TransferHttpCacheInterceptor, multi: true },
    ],
})

export class TransferHttpCacheModule { }