import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { book } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-my-collection-layout',
  templateUrl: './my-collection-layout.component.html',
  styleUrls: ['./my-collection-layout.component.scss'],
})
export class MyCollectionLayoutComponent implements OnInit {
  myCollectionList: Array<book> = [];
  constructor(private utilsSrvc: UtilsService, private router: Router) {}

  ngOnInit(): void {
    this.updateCollectionItems();
  }

  updateCollectionItems(): void {
    this.myCollectionList = [...this.utilsSrvc.modifybooksAppJson.myCollection];
  }
}
