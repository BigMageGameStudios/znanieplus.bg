import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
    name: 'safeURL'
})

export class SafeURL implements PipeTransform {

    constructor(private DomSanitizer: DomSanitizer){ }

    transform(value: string): any {
        if(value == null){
            return '';
        }
        return this.DomSanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
