import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { book } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-cards-layout',
  templateUrl: './cards-layout.component.html',
  styleUrls: ['./cards-layout.component.scss'],
})
export class CardsLayoutComponent {
  @Input() cardsList: Array<book> = [];
  @Input() showDelete = 'false';
  @Output() getEventFromCard = new EventEmitter();

  constructor(private router: Router, private utilsSrvc: UtilsService) {}

  goToDetailsPage(bookId: string) {
    this.router.navigate([`/cart-details/${bookId}`]);
  }

  deleteCartItem(bookId: string) {
    this.utilsSrvc.deleteItemFromCart(bookId);
    this.getEventFromCard.emit('');
  }

  trackByMethod(index: number, el: book): string {
    return el.id;
  }
}
