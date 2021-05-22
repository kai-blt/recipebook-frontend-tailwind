import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { recipeActions } from '../state/ducks';

const RecipeView = (props) => {
  const { name, type, imageURL, ingredients, steps } = props.recipe;
  const groups = Array.from(new Set(ingredients.map(ing => ing.ingredientgroup)));
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0; 
  },[]);

  const editRecipe = () => {
    push(`/edit-recipe/${name}`);
  };

  const cancel = () => {
    dispatch(recipeActions.viewRecipe(''));
  };

  return(
    <>
      <div className="w-full">
        <div className="w-full flex flex-row justify-end"><button onClick={cancel} className="button-close">X</button></div>        
        <h2 className="font-bold text-4xl">{name}</h2>
        <h3 className="font-light text-3xl">{type}</h3>     
        <section>
          <h4 className="h4">Ingredients</h4>
          <div className="flex flex-row justify-start">
            <div className="pl-2">           
              {groups.sort().map(grp => {
                return(
                  <div key={grp} className="mb-4">
                    <div className="font-light text-2xl mb-2 text-gray-700">{grp}</div>
                    <ul>
                      {ingredients.map(ing => 
                        ing.ingredientgroup === grp
                        ? <li key={ing.ingredientid}><span className="font-bold">{ing.quantity} {ing.measurement}</span> {ing.name}</li>
                        : null)
                      }
                    </ul>
                  </div>)
              })}
            </div>
            <div className="recipe-image-desktop" style={{backgroundImage: `url(${imageURL})`, backgroundSize: "cover"}}></div>
          </div>
        </section>
        <section>
          <h4 className="h4">Steps</h4>
          <div className="pl-2">
            <ul>
              {steps.sort((a, b) => a.stepnumber - b.stepnumber).map(step =><li key={step.stepid} className="mb-4"><span className="font-bold">{step.stepnumber}.</span> {step.instructions}</li>)}
            </ul>
          </div>
        </section>
        <div className="recipe-image sm:hidden" style={{backgroundImage: `url(${imageURL})`, backgroundSize: "cover"}}></div>
        <button onClick={editRecipe} className="button">Edit Recipe</button>
      </div>
    </>
  );
};

export default RecipeView;