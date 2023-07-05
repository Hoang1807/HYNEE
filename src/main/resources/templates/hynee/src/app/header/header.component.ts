import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('navbar') btnNav: ElementRef;
  hiddenCarousel: boolean = false;
  hiddenLogin: boolean = false;
  constructor(private router: Router, private renderer: Renderer2) {
    this.checkUrl();
  }
  checkUrl() {
    setTimeout(() => {
      if (this.router.url === '/home') {
        this.renderer.addClass(this.btnNav.nativeElement, 'show');
        this.hiddenCarousel = true;
        this.hiddenLogin = false;
      } else {
        this.hiddenCarousel = false;
        this.hiddenLogin = false;
        this.renderer.removeClass(this.btnNav.nativeElement, 'show');
      }
    }, 10);
  }
  showLogin() {
    if (!this.hiddenLogin) {
      this.hiddenLogin = true;
      this.hiddenCarousel = false;
    }
  }
}
