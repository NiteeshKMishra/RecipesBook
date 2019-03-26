import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: '[dropdownOpen]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  @HostListener('click') dropDownClick() {
    this.renderer.addClass(this.elRef.nativeElement.firstChild.nextSibling, 'show');
  }

  @HostListener('dblclick') close() {
    this.renderer.removeClass(this.elRef.nativeElement.firstChild.nextSibling, 'show');
  }

}