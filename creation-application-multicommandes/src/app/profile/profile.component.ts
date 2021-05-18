import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCategoryComponent } from '../admin/add-category/add-category.component';
import { AddProductComponent } from '../admin/add-product/add-product.component';
import { AddTagComponent } from '../admin/add-tag/add-tag.component';
import { Cart,  Category,  ERole,  Role,  User } from '../modell/model';
import { CartService } from '../Service/cart.service';
import { CategoryService } from '../Service/category.service';
import { TokenStorageService } from '../Service/token-storage.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  categories!: Category[] ;
  carts!: Cart[];
  cartLength = 0;
  user: User = {} as User;
 
  
  
  constructor(private token: TokenStorageService,
    private userService: UserService, private route: ActivatedRoute, private dialog: MatDialog,
    private categoryService: CategoryService, private cartService: CartService, private router: Router) {
    this.route.params.subscribe(
      params => {
          this.categoryService.findAllCategories().subscribe(categories => {
            this.categories = categories;
          })}
          )}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.cartService.findCartsForUser(this.currentUser.id).subscribe(carts => {
      this.carts = carts;
      this.cartLength = this.carts.length;
      console.log(this.cartLength);
    });
  }
  deleteCart(idPro: number, idUser: number) {
    if (confirm('Are you sure')) {
      this.cartService.removeFromCart(idPro, idUser).subscribe(() => {
        window.location.reload();
      })
    }
  }
  sangleProduct(name: any) {
    this.router.navigate(['/puy/product/', name]);
  }
 
 
 


 
}
