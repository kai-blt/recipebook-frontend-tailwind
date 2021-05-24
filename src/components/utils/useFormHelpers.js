import { useState } from 'react';
import * as yup from 'yup';
import schema from '../../validation/schema'; 

//Initial Form Values
export const initialFormValues = {
  name: "",
  type: "",
  imageURL: "",
  imageSearch: "",
  ingredients: [{ quantity: "", measurement: "", name: "", ingredientgroup: "" }],
  steps: [{stepnumber: 1, instructions: ""}]
};

export const initialErrors = {
  name: "",
  type: "",
  imageURL: "",
  imageSearch: "",
  quantity: "",
  ingredientname: "",
  measurement: "",
  group: "",
  instructions: ""
};

//Form Helper Functions
export const useFormHelpers = () => {
  const [formValues, setFormValues] = useState(initialFormValues);  
  const [errors, setErrors] = useState(initialErrors);

  const addIngredient = (e, index) => {
    e.preventDefault();
    const addIngredients = { ...formValues };
    addIngredients.ingredients.splice(index + 1, 0, {quantity: "", measurement: "", name: "", ingredientgroup: ""});
    setFormValues(addIngredients);
  };

  
  const delIngredient = (e, ingIndex) => {
    e.preventDefault();
    if (formValues.ingredients.length !== 1) {
        const delIngredient = formValues.ingredients.filter((ing, index)=> index !== ingIndex); 
        setFormValues({ ...formValues, ingredients: delIngredient });
    };
  };

  const addStep = (e, index) => {
    e.preventDefault();
    const addSteps = { ...formValues };
    addSteps.steps.splice(index + 1, 0, {stepnumber: index + 1, instructions: ""});
    addSteps.steps.map((step, index) => step.stepnumber = index + 1);
    setFormValues(addSteps);
  };

  const delStep = (e, stpIndex) => {
    e.preventDefault();
    if (formValues.steps.length !== 1) {
        const delSteps = formValues.steps.filter((stp, index) => index !== stpIndex);  
        delSteps.map((step, index) => step.stepnumber = index + 1);
        setFormValues({ ...formValues, steps: delSteps });  
    };
  };

  const validateField = (e) => {
    switch(e.target.name) {
      case "type":

        break;
      case "ingredientname":        
        // console.log(errors)
        console.log("HI", e.target.value)
        if (e.target.value.length < 2) {
          setErrors({...errors, name: 'crap'})
          console.log(errors)
        } else {
          console.log(errors)
          setErrors({...errors, name: ''})
        }   
        // console.log(validate1, errors)
        break;
      case "quantity":
        console.log(errors)
        let validate2 = e.target.value.length <= 1 ? setErrors({...errors, name: 'crap'}) : setErrors({...errors, name: ''})
        console.log(validate2, errors)
        break;
      case "measurement":
        console.log(errors)
        let validate3 = e.target.value.length <= 1 ? setErrors({...errors, name: 'crap'}) : setErrors({...errors, name: ''})
        console.log(validate3, errors)
        break;
      case "group":
        console.log(errors)
        let validate4 = e.target.value.length <= 1 ? setErrors({...errors, name: 'crap'}) : setErrors({...errors, name: ''})
        console.log(validate4, errors)
        break;
      case "instructions":
        console.log(errors)
        let validate5 = e.target.value.length <= 1 ? setErrors({...errors, name: 'crap'}) : setErrors({...errors, name: ''})
        console.log(validate5, errors)
        break;
      default:
        break;
    };    
  };

 
  const handleChange = (e, index) => {
    yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors({...errors, [e.target.name]: ""})
      })
      .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0] })
      });

    console.log(errors)

    switch(e.target.name) {
      case "ingredientname":        
        const newIngName = [ ...formValues.ingredients ];
        newIngName[index].name = e.target.value;
        setFormValues({...formValues, ingredients: newIngName });        
        break;
      case "quantity":
        const newIngQuantity = [ ...formValues.ingredients ];
        newIngQuantity[index].quantity = e.target.value;  
        setFormValues({ ...formValues, ingredients: newIngQuantity });
        break;
      case "measurement":
        const newIngMeasurement = [ ...formValues.ingredients ];
        newIngMeasurement[index].measurement = e.target.value;  
        setFormValues({ ...formValues, ingredients: newIngMeasurement });
        break;
      case "group":
        const newGroup = [ ...formValues.ingredients ];
        newGroup[index].ingredientgroup = e.target.value;  
        setFormValues({ ...formValues, ingredients: newGroup });
        break;
      case "instructions":
        const newSteps = [ ...formValues.steps ];
        newSteps[index].instructions = e.target.value;        
        setFormValues({ ...formValues, steps: newSteps });
        break;
      default:
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        break;
    };
  }; 

  return {
    initialFormValues,
    formValues,
    errors,
    setErrors,
    setFormValues,
    addIngredient,
    delIngredient,
    addStep,
    delStep,
    handleChange };
};

