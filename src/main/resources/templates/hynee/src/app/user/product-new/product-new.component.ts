import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/entity/Image.interface';
import { Product } from 'src/app/entity/Product.interface';
import { HttpImageService } from 'src/app/service/http-image.service';
import { HttpProductService } from 'src/app/service/http-product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
