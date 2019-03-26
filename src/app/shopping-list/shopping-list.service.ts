import { Ingredient } from "../shared/ingredient.model";
import { OnInit, Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Subject } from "rxjs";

export class ShoppingListService implements OnInit {

  ingredientChanged = new Subject<Ingredient[]>();
  ingredientClicked = new Subject<number>();


  private ingredients: Ingredient[] = [
    new Ingredient('Green Chilly', '5'),
    new Ingredient('Cabbage', '2')
  ];

  constructor() {
  }

  ngOnInit() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  UpdateIngredient(editedIndex: number, shopIngredient: Ingredient) {
    this.ingredients[editedIndex] = shopIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getSingleIngredient(index: number) {
    return this.ingredients[index];
  }

  AddIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  DeleteIngredient(editedIndex: number) {
    this.ingredients.splice(editedIndex, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }



}