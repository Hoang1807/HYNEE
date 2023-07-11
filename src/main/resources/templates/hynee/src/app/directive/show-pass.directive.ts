import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowPass]',
})
export class ShowPassDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    const inpPass = this.element.nativeElement.children[0];
    const btnShowPass = this.element.nativeElement.children[1];
    this.renderer.listen(btnShowPass, 'click', (event: any) => {
      if (btnShowPass.className.includes('fa-eye-slash')) {
        this.renderer.addClass(btnShowPass, 'fa-eye');
        this.renderer.removeClass(btnShowPass, 'fa-eye-slash');
        this.renderer.setProperty(inpPass, 'type', 'text');
      } else {
        this.renderer.addClass(btnShowPass, 'fa-eye-slash');
        this.renderer.removeClass(btnShowPass, 'fa-eye');
        this.renderer.setProperty(inpPass, 'type', 'password');
      }
    });
  }
}
