import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LostItem, FoundItem } from '../models/item';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  lostItem: LostItem;
  foundItem: FoundItem;

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute
  ) { }

  

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params) {
        this.itemService.getLostItem(params['id']).subscribe(
          lostItem => {
              this.lostItem = lostItem;
          }
        );
      }
    });

    this.route.params.subscribe(params => {
      if(params) {
        this.itemService.getFoundItem(params['id']).subscribe(
          foundItem => {
              this.foundItem = foundItem;
          }
        );
      }
    });
  }

}
