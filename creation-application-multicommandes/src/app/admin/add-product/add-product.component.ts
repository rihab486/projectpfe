import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/modell/model';
import { ProductService } from 'src/app/Service/product.service';
import{FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {} as Product;
  progressBar = false;
  myForm !: FormGroup;

  constructor(private productService: ProductService , @Inject(MAT_DIALOG_DATA)public data: any , private fb:FormBuilder ) { }

  ngOnInit(): void {
    if (this.data.idProduct != null) {
      this.productService.findProductById(this.data.idProduct).subscribe(product => {
        this.product = product;
      })
    }
  }

  addProduct() {
    this.progressBar = true;
    if (this.data.idProduct != null) {
      this.productService.editProduct(this.product, this.data.idProduct).subscribe(product => {
        this.product = product;
        window.location.reload();
      });
    } else {
      this.productService.addProductToCategory(this.product, this.data.idCategory).subscribe(product => {
        this.product = product;
        window.location.reload();
      });
    }
  }

 
}
