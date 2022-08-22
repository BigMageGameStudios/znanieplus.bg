import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminProvidersModule } from '../providers/module';

@NgModule({
    imports: [
        CommonModule,
        AdminProvidersModule
    ]
})

export class AdminGuardsModule { }