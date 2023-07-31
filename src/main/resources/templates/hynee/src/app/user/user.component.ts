import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpUserService } from '../service/http-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  isLoading = false;

  constructor(private httpUserService: HttpUserService) {}

  ngOnInit(): void {
    this.httpUserService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
