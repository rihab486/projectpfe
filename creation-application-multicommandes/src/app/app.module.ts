import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddTagComponent } from './admin/add-tag/add-tag.component';
import { AddTagToProductComponent } from './admin/add-tag-to-product/add-tag-to-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { DisplayTagComponent } from './display-tag/display-tag.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import {SidebarModule} from "ng-sidebar";
import { LivraisonComponent } from './livraison/livraison.component';
import { OrdersComponent } from './livraison/orders/orders.component';
import { ProductsComponent } from './livraison/products/products.component';
import { SangleProductComponent } from './livraison/sangle-product/sangle-product.component';
import { ShoppingCartComponent } from './livraison/shopping-cart/shopping-cart.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { from } from 'rxjs';
import { LivreurComponent } from './livreur/livreur.component';
import { ADMINComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent ,
    NavbarComponent,
    LoginComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddTagComponent,
    AddTagToProductComponent,
    DashboardComponent,
    DisplayCategoryComponent,
    DisplayTagComponent,
    ProfileComponent,
    SignupComponent,
    LivraisonComponent,
    OrdersComponent,
    ProductsComponent,
    SangleProductComponent,
    ShoppingCartComponent,
    SidebarComponent,
    LivreurComponent,
    ADMINComponent,  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    RouterTestingModule ,
    MatDialogModule,
    MatInputModule,MatProgressBarModule, BrowserAnimationsModule,
    HttpClientModule ,MatExpansionModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
