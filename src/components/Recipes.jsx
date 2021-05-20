import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { recipeActions } from '../state/ducks';
import { RecipeCard, RecipeView } from './'

const Recipes = (props) => {
  //Redux State Managers
  const dispatch = useDispatch();
  const { recipes, viewing, status, search, type } = useSelector(state => state.recipes);
  console.log(search)

  useEffect(() =>{
    dispatch(recipeActions.getRecipes());
  },[dispatch]);

  useEffect(() => {
    switch(status) {
      case "add-recipe/success":
        dispatch(recipeActions.getRecipes());
        break;
      case "delete-recipe/success":
        dispatch(recipeActions.getRecipes());
        break;
      case "edit-recipe/success":
        dispatch(recipeActions.getRecipes());
        break;
      default:
        break;
    };
  },[dispatch, status]);

  return (
    <div className="mt-24">
      <section className="flex flex-col justify-between mt-4 sm:flex-row flex-wrap">
        {viewing
          ? <RecipeView recipe={viewing} />
          : recipes
            ? type !== "ingredient" 
              ? recipes
                  .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                  .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
              : recipes
                  .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                  .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />) 
          : <div>Loading...</div> 
        }          
      </section>
    </div>
  );
};

export default Recipes;