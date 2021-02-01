import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LostItem, FoundItem } from '../models/item';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  option = {
    slidesPerView: 1.15,
    spaceBetween: -15
  }

  //imageSource = "..\assets\img\LAFLogo.png";
  lostItems: LostItem[];
  foundItems: FoundItem[]
  type: string;

  constructor(
    private itemService: ItemsService,
    private router: NavController,
    private route: Router
  ) {}

  ngOnInit() {
    this.itemService.getLostItems().subscribe(
      lostItems => {
        this.lostItems = lostItems;
      }
    );

    this.itemService.getFoundItems().subscribe(
      foundItems => {
        this.foundItems = foundItems;
      }
    );
  }

  navToAddPage() {
    this.router.navigateForward('add-item');
  }

  navToAbout() {
    this.router.navigateForward('about');
  }

}
