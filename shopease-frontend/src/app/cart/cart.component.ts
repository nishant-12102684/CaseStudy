import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <h2>Cart</h2>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    <table *ngIf="cartItems.length">
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      <tr *ngFor="let item of cartItems">
        <td>{{ item.productName }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price | currency }}</td>
      </tr>
    </table>
    <div *ngIf="!cartItems.length && !loading">Your cart is empty.</div>
  `,
  styles: [`.error { color: red; } table { width: 100%; margin-top: 16px; } th, td { padding: 8px; }`]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = false;
  error = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loading = true;
    this.cartService.getCartItems(1).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load cart items';
        this.loading = false;
      }
    });
  }
} 