import { useDispatch } from 'react-redux';
import { recipeActions } from '../state/ducks'

const RecipeCard = (props) => {
  const { name, imageURL } = props.recipe;
  const dispatch = useDispatch();

  const viewRecipe = () => {
    dispatch(recipeActions.viewRecipe(props.recipe));
  };

  return(
    <div className="recipe-card" onClick={viewRecipe} style={{backgroundImage: `url(${imageURL})`, backgroundSize: "cover"}}>
      <h2>{name}</h2>
    </div>
  );
};

export default RecipeCard;