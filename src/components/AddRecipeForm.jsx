import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import { useFormHelpers } from './utils/useFormHelpers';
import { recipeActions } from '../state/ducks';
import schema from '../validation/schema';

const AddRecipeForm = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [enableSubmit, setEnableSubmit] = useState(true);
  const { error } = useSelector(state => state.recipes);

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

  useEffect(()=>{
    dispatch(recipeActions.getRecipes());

    if (error === undefined) {
      <Redirect to='/'/>
    };

    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setFormValues({
      name: "",
      type: "Main",
      imageURL: "",
      ingredients: [{ quantity: "", measurement: "", name: "", ingredientgroup: "" }],
      steps: [{stepnumber: 1, instructions: ""}]
    });
  },[setFormValues])
  
  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {        
        setEnableSubmit(!valid);
      });
  }, [formValues]); 
  
  const cancel = () => {
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
    dispatch(recipeActions.addRecipe(newRecipe));   
    
    //Reinitialize form state
    setFormValues({...formValues, ...initialFormValues});

    dispatch(recipeActions.filterType(""));
    dispatch(recipeActions.viewRecipe(""));
  
    // Scroll to top for Safari
    document.body.scrollTop = 0;
    // Scroll to top for Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;

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
            <div className="text-red-400">{errors.name}</div>
            <label className="label">Type</label>
            <select name="type" value={formValues.type} onChange={handleChange} className="input">
              <option value="Main">Main</option>
              <option value="Side">Side</option>
              <option value="Sweets">Sweets</option>
              <option value="Drinks">Drinks</option>
            </select>
            <label className="label">Image URL</label>
            <input
              type="text"
              name="imageURL"
              value={formValues.imageURL}
              onChange={handleChange}
              className="input"
            />   
            <div className="text-red-400">{errors.imageURL}</div>
          </div>       
          <div className="mb-4">
            <h2 className="heading2">Ingredients</h2>
            {formValues.ingredients.map((ing, index) => (
              <div key={ing + index} className="form-group">
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
              <div key={stp + index}className="form-group">
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
          {enableSubmit ? <button className="button-disabled" disabled>Submit</button> :  <button className="button" onClick={e => submit(e)}>Submit</button>}          
        </form>
      </div>
    </div>
  )
}

export default AddRecipeForm;