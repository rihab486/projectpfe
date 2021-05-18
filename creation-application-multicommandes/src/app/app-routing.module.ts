import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { ADMINComponent } from './admin/admin.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayCategoryComponent } from './display-category/display-category.component';
import { DisplayTagComponent } from './display-tag/display-tag.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './livraison/products/products.component';
import { SangleProductComponent } from './livraison/sangle-product/sangle-product.component';
import { LivreurComponent } from './livreur/livreur.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'sideb',
    component: SidebarComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'sangle/product/:idProduct',
    component: SangleProductComponent
  },
  {
    path: 'dsiplay-category/:idCategory',
    component: DisplayCategoryComponent
  },
  {
    path: 'display-tag/:idTag',
    component: DisplayTagComponent
  },
  {
    path: 'puy/product/:name',
    component: SangleProductComponent
  },{
    path: 'livreur',
    component: LivreurComponent
  },{
    path: 'admin',
    component: ADMINComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  
  {
    path:'profile/:id',
    component:ProfileComponent,
    children: [
      {
        path: 'categories/:idCategory',
        component: CategoriesComponent
      }
    ]
  },
  {
    path: 'dsiplay-category/:idCategory',
    component: DisplayCategoryComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
