import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormHelpers } from './utils/useFormHelpers';
import { recipeActions } from '../state/ducks';
import { useEffect } from 'react';

const EditRecipeForm = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { recipename } = useParams();
  const { error } = useSelector(state => state.recipes);
  const recipe = useSelector(state => state.recipes.recipes.filter(recipe => recipe.name === recipename)[0]);

  //Form Helper Utils
  const { 
    initialFormValues,
    errors,
    formValues,
    setFormValues,
    addIngredient,
    delIngredient,
    addStep,
    delStep,
    handleChange
  } = useFormHelpers();

  useEffect(() =>{
    dispatch(recipeActions.getRecipes());

    if (error != '') {
      if (error.toJSON().message.includes('401')) {
        push('/');
      }; 
    };
    
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;

    setFormValues({
      ...formValues,
      ...recipe
    });
  },[])
    
  const deleteConfirmation = (e) => {
    e.preventDefault();
    const modal = document.querySelector('.modal-invisible');
    modal.classList.toggle('visible');
    modal.classList.toggle('opacity-100');
    modal.classList.toggle('bg-opacity-90');
  };

  const deleteRecipe = (e) => {
    e.preventDefault();
    dispatch(recipeActions.deleteRecipe(recipe.recipeid));
    setFormValues({...formValues, ...initialFormValues});
    dispatch(recipeActions.viewRecipe(''));
    push('/recipes');
  };

  const submit = (e) => {
    e.preventDefault();   

    //Create new recipe object
    const { name, type, imageURL, ingredients, steps } = formValues;
    const newRecipe = {
      name,
      type,
      user: {
          username: localStorage.getItem("username")
        },
      imageURL,
      ingredients,
      steps
    };

    //Dispatch action to add recipe
    dispatch(recipeActions.editRecipe(recipe.recipeid, newRecipe));   
    
    //Reinitialize form state
    setFormValues(initialFormValues);
  
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;

    dispatch(recipeActions.viewRecipe(''));
    push('/recipes');
  };

  const cancel = () => {
    push('/recipes');
  };

  return(
    <div className="mt-20">    
      <div className="form-container">
        <div className="w-full flex flex-row justify-end"><button onClick={cancel} className="button-close">X</button></div>      
        <form>
          <h2 className="heading2">About</h2>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="input"
            />
            <label className="label">Type</label>
            <input
              type="text"
              name="type"
              value={formValues.type}
              onChange={handleChange}
              className="input"
            />
            <label className="label">Image URL</label>
            <input
              type="text"
              name="imageURL"
              value={formValues.imageURL}
              onChange={handleChange}
              className="input"
            />   
          </div>        
          <div className="mb-4">
            <h2 className="heading2">Ingredients</h2>
            {formValues.ingredients.map((ing, index) => (
              <div className="form-group">
                <label className="label">Qty</label>
                <input
                  type="text"
                  name="quantity"
                  value={ing.quantity}
                  onChange={e => handleChange(e, index)}
                  className="input"
                />     
                <label className="label">Measure</label>
                <input
                  type="text"
                  name="measurement"
                  value={ing.measurement}
                  onChange={e => handleChange(e, index)}
                  className="input"
                />     
                <label className="label">Ingredient</label>
                <input
                  type="text"
                  name="ingredientname"
                  value={ing.name}
                  onChange={e => handleChange(e, index)}
                  className="input"
                />     
                <label className="label">Group</label>
                <input
                  type="text"
                  name="group"
                  value={ing.ingredientgroup}
                  onChange={e => handleChange(e, index)}
                  className="input"
                />
                <div className="flex flex-row justify-between">
                  <button className="button-remove" onClick={e => delIngredient(e, index)}>-</button> 
                  <button className="button-add" onClick={e => addIngredient(e, index)}>+</button>    
                </div>
              </div>
            ))}      
          </div>
          <div className="mb-4">
            <h2 className="heading2">Steps</h2>
            {formValues.steps.map((stp, index) => (
              <div className="mb-12 border-2 p-2 rounded-lg bg-gray-100">
                <label className="label">Step {stp.stepnumber}</label>
                <textarea
                  type="text"
                  name="instructions"
                  value={stp.instructions}
                  onChange={e => handleChange(e, index)}
                  className="textarea"
                />
                <div className="flex flex-row justify-between">
                  <button className="button-remove" onClick={e => delStep(e, index)}>-</button> 
                  <button className="button-add" onClick={e => addStep(e, index)}>+</button>    
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <button className="button-cancel w-96 mr-1" onClick={e => deleteConfirmation(e)}>Delete</button>
            <button className="button w-96 ml-1" onClick={e => submit(e)}>Submit</button>
          </div>
        </form>
      </div>
      <div className="modal-invisible">
        <div className="modal">
          <div className="font-bold text-2xl">Are you sure?</div>
          <div className="flex flex-row justify-between">
            <button className="button-cancel mr-1" onClick={e => deleteConfirmation(e)}>Cancel</button>
            <button className="button ml-1" onClick={deleteRecipe}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditRecipeForm;