import { Recipe } from "./recipe.model";
import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject, Subscription } from "rxjs";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService implements OnInit, OnDestroy {

  recipeChanged = new Subject<Recipe[]>();

  ingToAdd = new Subject<Ingredient[]>();

  ingSubs: Subscription;


  private recipes: Recipe[] = [
    new Recipe('Potato', 'Potato is used in everything.', 'https://img.tesco.com/Groceries/pi/000/0262410000000/IDShot_540x540.jpg',
      [new Ingredient('Apple', '10'), new Ingredient('Fruit', '8')]),
    new Recipe('Tomato', 'Tomato is key ingredient in food.', 'https://static1.squarespace.com/static/553a8ddae4b0bd1c1a10972e/t/590cef0f15d5dbcc2c31bb9a/1494019860762/?format=1000w',
      [new Ingredient('Bannana', '10'), new Ingredient('Fruit', '8')])
  ];

  constructor(private shopService: ShoppingListService) {
    this.ingSubs = this.ingToAdd.subscribe((ing: Ingredient[]) => {
      ing.forEach(element => {
        this.shopService.AddIngredient(element);
      });
    }
    );
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ingSubs.unsubscribe();
  }

  getRecipe() {
    return this.recipes.slice();
  }

  getSingleRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  AddSingleRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  UpdateSingleRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  DeleteSingleRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}