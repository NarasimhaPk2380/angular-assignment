import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { appSubjectI } from '@buyonline/shared/data-access/models';
import { UtilsService } from '@buyonline/shared/data-access/services';

@Component({
  selector: 'buyonline-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss'],
})
export class NavbarLayoutComponent implements OnInit {
  availableCartItem: number = 0;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private utilsSrvc: UtilsService) {}

  ngOnInit(): void {
    this.utilsSrvc.bookAppSubject$.subscribe((event: appSubjectI) => {
      if (event?.type === 'addToCart') {
        this.availableCartItem = this.utilsSrvc.modifybooksAppJson?.cartItems?.length;
      }
    });
  }
}
