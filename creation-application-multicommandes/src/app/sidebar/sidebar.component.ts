import { Component, OnInit } from '@angular/core';
import { Category } from '../modell/model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  imageurl= "assets/ecommerce.png";
  opened = false;
  categories!: Category[] ;


  constructor() { }

  ngOnInit(): void {
  }

}
