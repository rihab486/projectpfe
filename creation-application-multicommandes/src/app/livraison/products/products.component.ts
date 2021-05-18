import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { Cart, Product, ProductOrder, ProductOrders, User } from 'src/app/modell/model';
import { CartService } from 'src/app/Service/cart.service';
import { OrderService } from 'src/app/Service/order.service';
import { ProductService } from 'src/app/Service/product.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder!: ProductOrder;
  shoppingCartOrders!: ProductOrders;
  sub!: Subscription;
  productSelected = false;
  description: string = '';
  showMyContainerInfo = false;
  showBtn = -1;
  isLoggedIn:any;
  currentUser: any;
  cart: Cart = {} as Cart;
  cartExist: Cart = {} as Cart;
  constructor(private tokenStorageService: TokenStorageService,
    private orderService: OrderService, private router: Router, private dialog: MatDialog,
    private productService: ProductService,private cartService: CartService, private userService: UserService)
     {
      
      }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
    this.isLoggedIn = this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();
     
    }

  }
  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }
  loadProducts() {
    this.productService.findAllProducts().subscribe(
      (products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        })
      }
    );
  }
  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.orderService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }
  addToCart(order: ProductOrder,idUser: number) {
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
    this.cart.name = order.product.name;
    this.cart.price = order.product.price;
    this.cart.quantity = order.quantity;
    this.cart.addedAt=order.product.addedAt;
    this.cart.pictureUrl = order.product.pictureUrl;
    this.cartService.addCartToUser(this.cart, idUser).subscribe(cart => {
      this.cart = cart;
      this.cartService.saveCartName(this.cart.name);
    })
  }
  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  removeFromCart(productOrder: ProductOrder, idUser: number) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
      const name = this.cartService.getCartName();
      this.cartService.findCartsForUser(idUser).subscribe(carts =>
         {this.cartExist = carts.filter(item => item.name === name)[0];

        this.cartService.removeFromCart(this.cartExist.id,idUser).subscribe(() => {
        })
      })
    }
    this.orderService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.orderService.ProductOrders;
    this.productSelected = false;
  }
  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }
 
 
 
  productInfo(id: number) {
    this.productService.findProductById(id).subscribe(data => {
      this.description = data.description;
      console.log(this.description);
    });
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }

  showUndoBtn(index: number) {
    this.showBtn = index;
  }

  sngleProduct(id: number) {
    this.router.navigate(['sangle/product', id]);
  }
  login() {
    this.dialog.open(LoginComponent);
  }
}
