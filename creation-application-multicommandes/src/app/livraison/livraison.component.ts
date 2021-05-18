import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../modell/model';
import { ProductService } from '../Service/product.service';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  orderFinished = false;
  showSearch = false;
  name: any;
  products: Product[] = [];
  product: Product = {} as Product;
  showBtn = -1;
  showMyContainerInfo = false;
  paid! : boolean;

  @ViewChild('productsC')
  productsC!: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC!: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC!: OrdersComponent;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }
  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }
  sngleProduct(id: number) {
    this.router.navigate(['sangle/product', id]);
  }
  showUndoBtn(index: number) {
    this.showBtn = index;
  }
  productInfo(id: number) {
    this.productService.findProductById(id).subscribe((product) => {
      this.product = product;
    });
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }
  
  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
  }

}
