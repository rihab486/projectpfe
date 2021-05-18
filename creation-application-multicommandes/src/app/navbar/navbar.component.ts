import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsComponent } from '../livraison/products/products.component';
import { LoginComponent } from '../login/login.component';
import { Category, Product, User } from '../modell/model';
import { CategoryService } from '../Service/category.service';
import { TokenStorageService } from '../Service/token-storage.service';
import { UserService } from '../Service/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  user: User = {} as User;
  name: any;
  opened = false;
  categories!: Category[] ;
  orderFinished = false;
  showSearch = false;
  products!: Product[];
  product: Product = {} as Product;
  showBtn = -1;
  showMyContainerInfo = false;
  @ViewChild('productsC')
  productsC!: ProductsComponent ;
  
  constructor(private tokenStorageService: TokenStorageService,public router:Router, public dialog: MatDialog,private categoryService: CategoryService, private userService: UserService)
   {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    this.categoryService.findAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  search(){}
  login() {
    this.dialog.open(LoginComponent);
  }
  toggleSidebar()
  {
    this.opened= !this.opened;
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
}
