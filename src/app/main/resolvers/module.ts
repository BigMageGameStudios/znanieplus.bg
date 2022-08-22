import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainProvidersModule } from '../providers/module';

@NgModule({
    imports: [
        CommonModule,
        MainProvidersModule
    ]
})

export class MainResolversModule { }
