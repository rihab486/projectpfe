import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/modell/model';
import { CategoryService } from 'src/app/Service/category.service';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category: Category = {} as Category ;
  myForm !: FormGroup;
  progressBar = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private categoryService: CategoryService,private fb:FormBuilder) { }

  ngOnInit(): void {
    if(this.data.idCategory != null){
      this.categoryService.findCategoryById(this.data.idCategory).subscribe(category => {
        this.category = category;
      })
    } 

    let formcontrols = {
      name: new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z . '-]+"),
        Validators.minLength(2),
        Validators.maxLength(7)
      ])
    }
    this.myForm=this.fb.group(formcontrols);
  }
  get u(){
    return this.myForm.get('name');}
  
addCategory(){
 this.progressBar = true;

    if (this.data.idCategory != null) {
      this.categoryService.editCategory(this.category,this.data.idCategory).subscribe(category=>{
         this.category=category;
         window.location.reload();
      });
    
  }
  else {
    console.log(this.category)
    this.categoryService.addCategoryToUser(this.category, this.data.idUser).subscribe(category => {
      this.category = category;
      window.location.reload();
    })
  }
}
}

