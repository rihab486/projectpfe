import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Category, User } from '../modell/model';
import { CartService } from '../Service/cart.service';
import { CategoryService } from '../Service/category.service';
import { TokenStorageService } from '../Service/token-storage.service';
import { UserService } from '../Service/user.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddTagComponent } from './add-tag/add-tag.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class ADMINComponent implements OnInit {

  currentUser: any;

  categories!: Category[] ;
  carts!: Cart[];
  cartLength = 0;
  user: User = {} as User;
 
  tokenStorageService: any;
  
  constructor(private token: TokenStorageService,
    private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private categoryService: CategoryService, private cartService: CartService, private router: Router) {
    this.route.params.subscribe(
      params => {
  
       
          this.categoryService.findAllCategories().subscribe(categories => {
            this.categories = categories;
          })})}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.cartService.findCartsForUser(this.currentUser.id).subscribe(carts => {
      this.carts = carts;
      this.cartLength = this.carts.length;
      console.log(this.cartLength);
    });
  }
 
 
  addCategory(idUser: number) {
    this.dialog.open(AddCategoryComponent, {
      data: { idUser }
    })
  }
  addProduct(idCategory: any) {
    this.dialog.open(AddProductComponent, {
      data: { idCategory }
    })
  }
  addTag() {
    this.dialog.open(AddTagComponent);
  }
  deleteCart(idPro: number, idUser: number) {
    if (confirm('Are you sure')) {
      this.cartService.removeFromCart(idPro, idUser).subscribe(() => {
        window.location.reload();
      })
    }
  }
 
 

}
