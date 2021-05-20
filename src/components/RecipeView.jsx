import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { recipeActions } from '../state/ducks';

const RecipeView = (props) => {
  const { name, type, imageURL, ingredients, steps } = props.recipe;
  const groups = Array.from(new Set(ingredients.map(ing => ing.ingredientgroup)));

  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0; 
  },[])

  const stopViewing = () => {
    dispatch(recipeActions.viewRecipe(''))
  };

  return(
    <>
      <div className="w-full">
        <button className="button" onClick={stopViewing}>Back</button> 
        <h2 className="font-bold text-4xl">{name}</h2>
        <h3 className="font-light text-3xl">{type}</h3>     
        <section>
          <h4 className="font-bold text-2xl text-green-400 mt-4">Ingredients</h4>
          <div className="pl-2">           
            {groups.sort().map(grp => {
              return(
                <div key={grp} className="mb-4">
                  <div className="font-light text-2xl mb-2 text-gray-700">{grp}</div>
                  <ul>
                    {ingredients.map(ing => 
                      ing.ingredientgroup === grp
                      ? <li key={ing.ingredientid}><span className="font-bold">{ing.quantity} {ing.measurement}</span> {ing.name} {ing.ingredientgroup}</li>
                      : null)
                    }
                  </ul>
                </div>)
            })}
          </div>
        </section>
        <section>
          <h4 className="font-bold text-2xl text-green-400 mt-4">Steps</h4>
          <div className="pl-2">
            <ul>
              {steps.sort().map(step =><li key={step.stepid} className="mb-4"><span className="font-bold">{step.stepnumber}.</span> {step.instructions}</li>)}
            </ul>
          </div>
        </section>
        <img src={imageURL} alt={name} className="recipe-image" />
      </div>
    </>
  );
};

export default RecipeView;