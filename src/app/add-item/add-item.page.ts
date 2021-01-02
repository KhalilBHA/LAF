import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LostItem } from '../models/item';
import { ItemsService } from '../services/items.service';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  

  option = {
    slidesPerView: 1,
    allowSlideNext: false,
    allowSlidePrev: false
  }

  items: LostItem[] = [];
  itemForm = this.fb.group({
    title: ['', Validators.required],
    phone: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required],
    category: [''],
    brand: [''],
    model: [''],
    description: ['']
  });
  isSubmitted = false;
  public selectedValue: string;

  constructor(
    private itemService: ItemsService,
    private router: NavController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  itemTypeSelected($event) {
    return this.selectedValue = $event.target.value ;
}

  save() {
    this.isSubmitted = true;
    if(this.selectedValue === "Lost") {
      const item = this.itemForm.value;
      this.itemService.saveLostItem(item).subscribe(
        newItem => {
          this.items.push(newItem);
          this.itemForm.reset();
          this.itemService.newLostItem$.next(newItem);
          this.router.navigateForward('home');
        }
      )
    } else {
      const item = this.itemForm.value;
      this.itemService.saveFoundItem(item).subscribe(
        newItem => {
          this.items.push(newItem);
          this.itemForm.reset();
          this.itemService.newFoundItem$.next(newItem);
          this.router.navigateForward('home');
        }
      )
    }
    
  }

  formInputIsRequired(formInput: string) {
    if (this.itemForm.controls[formInput]) {
      if (this.itemForm.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }

  get errorControl() {
    return this.itemForm.controls;
  }

  goToSlide(slideNo) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideNo, 500);
    this.slides.lockSwipes(true);
  }

  

}
