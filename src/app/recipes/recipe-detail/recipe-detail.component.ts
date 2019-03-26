import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.
      subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipeService.getSingleRecipe(+params['id']);
      })
  }
  EditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  AddToShoppingList() {
    this.recipeService.ingToAdd.next(this.recipeDetail.ingredient);
  }

  OnDeleteRecipe() {
    this.recipeService.DeleteSingleRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
