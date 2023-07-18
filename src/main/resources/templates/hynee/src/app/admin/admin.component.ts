import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    $('#sidebarToggleTop').on('click', function (e) {
      $('body').toggleClass('sidebar-toggled'),
        $('.sidebar').toggleClass('toggled');
    });
  }
}
