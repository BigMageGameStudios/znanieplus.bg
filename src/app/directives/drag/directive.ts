import { Directive, HostListener, ElementRef, Inject } from '@angular/core';

@Directive({
    selector: '[drag]'
})

export class DragDirective{

    target!: EventTarget | null;

    readonly threshold = 10;

    x = 0;
    left = 0;
    drag = false
    move = false;

    constructor(
        private element: ElementRef<HTMLDivElement>
    ) { }

    disableHref(){
        const linkElements = this.element.nativeElement.querySelectorAll('a');
        linkElements.forEach((item) => {
            item.classList.add('disable-link')
        });
    }

    enableHref(){
        const linkElements = this.element.nativeElement.querySelectorAll('a');
        linkElements.forEach((item) => {
            item.classList.remove('disable-link')
        });
    }

    @HostListener('mousedown', ['$event']) mousedown(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.x = event.pageX;
        this.left = this.element.nativeElement.scrollLeft;
        this.drag = true;
        this.target = event.target;
        return false
    }

    @HostListener('mouseup', ['$event']) mouseup(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.drag = false;
        this.move = false;
        this.enableHref();
        return false
    }

    @HostListener('mousemove', ['$event']) mousemove(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (this.drag) {
            if (Math.abs(event.pageX - this.x) >= this.threshold) {
                this.move = true;
            }
            if (this.move) {
                this.element.nativeElement.scrollLeft = this.left - event.pageX + this.x;
                this.disableHref();
            }
        }
        return false
    }

    @HostListener('mouseleave', ['$event']) mouseleave(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.drag = false;
        this.move = false;
        return false

    }


}

