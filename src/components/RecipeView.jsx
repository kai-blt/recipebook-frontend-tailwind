import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { recipeActions } from '../state/ducks';

const RecipeView = (props) => {
  const { name, type, imageURL, ingredients, steps } = props.recipe;
  const groups = Array.from(new Set(ingredients.map(ing => ing.ingredientgroup)));

  useEffect(() => {
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0; 
  },[])

  return(
    <>
      <div className="max-w-full">
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
        <div className="recipe-image" style={{backgroundImage: `url(${imageURL})`, backgroundSize: "cover"}}></div>
      </div>
    </>
  );
};

export default RecipeView;