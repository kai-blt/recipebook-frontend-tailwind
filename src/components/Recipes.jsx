import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { recipeActions } from '../state/ducks';
import { RecipeCard, RecipeView } from './'

const Recipes = (props) => {
  //Redux State Managers
  const dispatch = useDispatch();
  const { recipes, viewing, status, search, searchType, filterType } = useSelector(state => state.recipes);
  
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
      {viewing !== ""
        ? null
        : <div className="mb-4 ml-4 sm:ml-14 font-bold text-gray-700">Viewing <span className="font-bold text-purple-700">{filterType == "" ? 'ALL' : filterType.toUpperCase()}</span> recipes:</div>
      }
      <section className="recipe-container">
        {viewing
          ? <RecipeView recipe={viewing} />
          : searchType 
            ? 
              {
                'title': 
                  filterType
                    ? {
                        'main':
                          recipes
                            .filter(recipe => recipe.type.match(new RegExp(`${filterType}`, "i")))
                            .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />), 
                        'side':
                          recipes
                            .filter(recipe => recipe.type.match(new RegExp(`${filterType}`, "i")))
                            .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />),  
                        'sweets':
                          recipes
                            .filter(recipe => recipe.type.match(new RegExp(`${filterType}`, "i")))
                            .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />), 
                        '':
                          recipes
                            .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
                      }[filterType]
                    : recipes
                      .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                      .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />),
                'ingredient':
                  filterType 
                    ? {
                        'main':
                          recipes
                            .filter(recipe => recipe.type.match(new RegExp(`${filterType}`, "i")))
                            .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
                            ,
                        'side':
                          recipes
                            .filter(recipe => recipe.type.match(new RegExp(`${filterType}`, "i")))
                            .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
                          ,
                        'sweets':
                          recipes
                            .filter(recipe => recipe.type.match(new RegExp(`${filterType}`, "i")))
                            .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
                          ,
                        '':
                          recipes
                            .filter(recipe => recipe.name.match(new RegExp(`${search}`, "i")))
                            .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
                            
                      }[filterType]
                  : recipes
                    .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${search}`, "i"))))
                    .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />) 
          }[searchType]
              
            :<div>Loading...</div>
        }          
      </section>
    </div>
  );
};

export default Recipes;