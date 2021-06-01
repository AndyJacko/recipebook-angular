import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Spicy Steak Salad",
  //     "Fried steak and succulent salad.",
  //     "https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg",
  //     [
  //       new Ingredient("Steak", 1),
  //       new Ingredient("Tomato", 1),
  //       new Ingredient("Red Chillie", 1),
  //       new Ingredient("Lettuce", 3),
  //       new Ingredient("Spring Onion", 2),
  //     ]
  //   ),
  //   new Recipe(
  //     "Bacon Wrapped Chicken",
  //     "Juicy chicken breast covered with crispy bacon.",
  //     "https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_1280.jpg",
  //     [
  //       new Ingredient("Chicken Breast", 1),
  //       new Ingredient("Bacon Rasher", 3),
  //       new Ingredient("Cheddar Cheese", 1),
  //       new Ingredient("Onion", 1),
  //       new Ingredient("Sweetcorn", 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
