import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeURL } from './safe-url';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SafeURL
    ],
    exports: [
        SafeURL
    ]
})

export class SafeURLModule { }
