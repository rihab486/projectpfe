
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { Cart, Product, ProductOrder, ProductOrders, Tag,Comment, UpdateProduct, User, Order } from 'src/app/modell/model';
import { CartService } from 'src/app/Service/cart.service';
import { CommentService } from 'src/app/Service/comment.service';
import { OrderService } from 'src/app/Service/order.service';
import { ProductService } from 'src/app/Service/product.service';
import { TokenStorageService } from 'src/app/Service/token-storage.service';
import { UserService } from 'src/app/Service/user.service';
import { OrdersComponent } from '../orders/orders.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';


@Component({
  selector: 'app-sangle-product',
  templateUrl: './sangle-product.component.html',
  styleUrls: ['./sangle-product.component.css']
})
export class SangleProductComponent implements OnInit {
  name!: string;
 
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  orderFinished = false;
  shoppingCartOrders!: ProductOrders;
  sub!: Subscription;
  tags: Tag[] = [];
  cartExist: Cart = {} as Cart;
  cart: Cart = {} as Cart;
  currentUser : any;
  selectedProductOrder!: ProductOrder;
  productSelected: boolean = false;
  collapsed = true;
  showBtn = -1;
  submitted = false;
  comment: Comment = {} as Comment;
  comments!: Comment[];
 

  @ViewChild('shoppingCartC')
  shoppingCartC!: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC!: OrdersComponent;

  description: string = '';
  showMyContainerInfo: boolean = false;

  idProduct!: number;
  product!: UpdateProduct;

  counter: number = 1;
  @Input() url = location.href;
  isLoggedIn: any;
  roles: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  
  constructor(private tokenStorageService: TokenStorageService,
    private productService: ProductService,private token: TokenStorageService, 
    private orderService: OrderService, private route: ActivatedRoute, private userService: UserService,
    private dialog: MatDialog,private cartService: CartService,private commentService :CommentService) 
    { }

  ngOnInit(): void {
    this.loadOrders();
    this.sangleProduct();
    
    this.isLoggedIn = this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();
     
    }
  
    
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
  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }
  private sangleProduct() {
    
    this.product = new UpdateProduct();
    this.idProduct = this.route.snapshot.params.idProduct;
    this.commentService.findCommentsForProduct(this.idProduct).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
   
    this.productService.findProductById(this.idProduct).subscribe(data => {
      this.name = data.name;
      this.productService.findByName(this.name).subscribe((products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      });
      this.submitted = true;
    });
  }
    
  addToCart(order: ProductOrder, idUser: number) {
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


  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }


  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  addComment(idProduct: number, username: any)
   {
     this.comment.addedBy= username;
     this.commentService.addCommentToProduct(this.comment, idProduct).subscribe(
       ( comment: any) => { 
         this.comment = this.comment;
            window.location.reload();
      
      })
   }

  login() {
    this.dialog.open(LoginComponent);
  }

 

}
