const RecipeCard = (props) => {
  const { name, imageURL } = props.recipe
  return(
    <div className="recipe-card relative" style={{backgroundImage: `url(${imageURL})`, backgroundSize: "cover"}}>
      <h2>{name}</h2>
    </div>
  );
};

export default RecipeCard;