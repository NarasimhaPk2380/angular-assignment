import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { book } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-my-cart-items-layout',
  templateUrl: './my-cart-items-layout.component.html',
  styleUrls: ['./my-cart-items-layout.component.scss'],
})
export class MyCartItemsLayoutComponent implements OnInit {
  cartItemsList: Array<book> = [];
  constructor(private utilsSrvc: UtilsService, private router: Router) {}

  ngOnInit(): void {
    this.updateCartItems();
  }

  updateCartItems(): void {
    this.cartItemsList = [...this.utilsSrvc.modifybooksAppJson.cartItems];
  }
}
