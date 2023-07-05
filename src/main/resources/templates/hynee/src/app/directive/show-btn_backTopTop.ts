import {
  Directive,
  ViewChild,
  ElementRef,
  Renderer2,
  HostBinding,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appShowButtonBackToTop]',
})
export class ShowButtonBackToTopDirective implements OnInit {
  @HostBinding('class.d-block') isShow: boolean = false;
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.listen('window', 'scroll', (event: Event) => {
      if (document.documentElement.scrollTop > 100) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
    this.renderer.listen(
      this.element.nativeElement,
      'click',
      (event: Event) => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    );
  }
}
