import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img:not([loading])',
})
export class LazyloadDirective {
  constructor(el: ElementRef) {
    el.nativeElement.setAttribute('loading', 'lazy');
  }
}
