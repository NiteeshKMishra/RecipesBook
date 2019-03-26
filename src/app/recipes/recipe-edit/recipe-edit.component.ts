import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editRequired: boolean;
  RecipeForm: FormGroup;

  recipeName: String = '';
  recipeDescription: String = '';
  recipeImagePath: String = '';
  recipeIngredient = new FormArray([]);


  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.
      subscribe((params: Params) => {
        this.id = +params['id'];
        this.editRequired = params['id'] != null ? true : false;
        this.initForm();
      });
  }

  OnAddIngredient() {
    this.recipeIngredient.push(new FormGroup({
      'ingredientName': new FormControl(null, Validators.required),
      'ingredientAmmount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  OnDeleteIngredient(index: number) {
    this.recipeIngredient.removeAt(index);
  }
  private initForm() {
    const recipe = this.recipeService.getSingleRecipe(this.id);
    if (this.editRequired) {
      this.recipeName = recipe.name;
      this.recipeImagePath = recipe.imagePath;
      this.recipeDescription = recipe.description;
      if (recipe.ingredient != null) {
        recipe.ingredient.forEach(ingredient => {
          this.recipeIngredient.push(new FormGroup({
            'ingredientName': new FormControl(ingredient.name, Validators.required),
            'ingredientAmmount': new FormControl(+ingredient.ammount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        });
      }
    }
    this.RecipeForm = new FormGroup({
      'recipeName': new FormControl(this.recipeName, Validators.required),
      'recipeImagePath': new FormControl(this.recipeImagePath, Validators.required),
      'recipeDescription': new FormControl(this.recipeDescription, Validators.required),
      'ingredients': this.recipeIngredient
    });
  }

  OnSubmit() {
    const ingArray: Ingredient[] = [];
    this.RecipeForm.value['ingredients'].forEach(ingredient => {
      const ingName = ingredient.ingredientName;
      const ingamount = ingredient.ingredientAmmount
      ingArray.push(new Ingredient(ingName, ingamount));
      console.log(ingredient.ingredientName);
    });

    const recipe = new Recipe(
      this.RecipeForm.value['recipeName'],
      this.RecipeForm.value['recipeDescription'],
      this.RecipeForm.value['recipeImagePath'],
      ingArray
    );
    if (this.editRequired) {
      this.recipeService.UpdateSingleRecipe(this.id, recipe);
    }
    else {
      this.recipeService.AddSingleRecipe(recipe);
    }
    this.OnClear();
  }

  OnClear() {
    this.RecipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
