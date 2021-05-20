import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipeActions } from '../state/ducks';
import { RecipeCard, RecipeView } from './'

const Recipes = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('title');

  //Redux State Managers
  const dispatch = useDispatch();
  const { recipes, viewing, status } = useSelector(state => state.recipes);

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

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  };

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <section>
        {viewing
          ? null
          : 
            <> 
            <label className="label">Search by</label>
            <select onChange={handleSearchType} className="font-bold text-green-400">
              <option value="title">title</option>
              <option value="ingredient">ingredient</option>
            </select>
            <input
              type="text"
              name="search"
              value={searchValue}
              onChange={handleSearch}
              className="input"
            />
            </>        
        }
       
      </section>
      <section className="flex flex-col justify-between mt-4 sm:flex-row flex-wrap">
      {viewing
      ? <RecipeView recipe={viewing} />
      : recipes
        ? searchType !== "ingredient" 
          ? recipes
              .filter(recipe => recipe.name.match(new RegExp(`${searchValue}`, "i")))
              .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />)
          : recipes
              .filter(recipe => recipe.ingredients.some(ing => ing.name.match(new RegExp(`${searchValue}`, "i"))))
              .map(recipe => <RecipeCard key={recipe.recipeid} recipe={recipe} />) 
      : <div>Loading...</div>
      }          
      </section>
    </>
  );
};

export default Recipes;