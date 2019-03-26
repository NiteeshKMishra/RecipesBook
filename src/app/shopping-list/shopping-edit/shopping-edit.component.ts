import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shopForm: NgForm;
  ingClickSubs: Subscription;
  editMode: boolean = false;
  editedIndex: number;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingClickSubs = this.shoppingListService.ingredientClicked.
      subscribe((index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        const ing: Ingredient = this.shoppingListService.getSingleIngredient(index);
        this.shopForm.setValue({
          'name': ing.name,
          'amount': ing.ammount
        });
      });
  }

  ngOnDestroy() {
    this.ingClickSubs.unsubscribe()
  }

  OnClear() {
    this.editMode = false;
    this.shopForm.reset();
  }

  OnDelete() {
    this.shoppingListService.DeleteIngredient(this.editedIndex);
    this.OnClear();
  }
  OnAdded() {
    const shopIngredient = new Ingredient(this.shopForm.value['name'], this.shopForm.value['amount']);
    if (this.editMode) {
      this.shoppingListService.UpdateIngredient(this.editedIndex, shopIngredient);
    } else {
      this.shoppingListService.AddIngredient(shopIngredient);
    }
    this.OnClear();
  }

}
