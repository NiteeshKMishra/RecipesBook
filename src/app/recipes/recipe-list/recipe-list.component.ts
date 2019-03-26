import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubs: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeSubs = this.recipeService.recipeChanged.
      subscribe((recipe: Recipe[]) => {
        this.recipes = recipe;
      });
    this.recipes = this.recipeService.getRecipe();
  }
  ngOnDestroy() {
    this.recipeSubs.unsubscribe();
  }
  NewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
