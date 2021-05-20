import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { recipeActions } from '../state/ducks';

const NavBar = () => {
  const [search, setSearch] = useState('');
  
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeActions.searchRecipe(search));
  }, [dispatch, search])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchType = (e) => {
    dispatch(recipeActions.searchType(e.target.value));
  };

  const createRecipe = () => {
    push('/add-recipe');
  };

  const viewRecipe = () => {    
     // Scroll to top for Safari
     document.body.scrollTop = 0;
     // Scroll to top for Chrome, Firefox, IE, Opera
     document.documentElement.scrollTop = 0; 
    dispatch(recipeActions.viewRecipe(""));
  };

  return(    
    <nav className="p-4 w-full border-b-2 border-gray-300 shadow-md flex flex-row justify-between fixed top-0 left-0 z-10 bg-gray-200"> 
      <button className="w-1/6">
        <svg className="text-green-400" viewBox="0 0 100 80" fill="gray" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </button>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
        onFocus={viewRecipe}
        className="input w-3/6"
      />      
      <select onChange={handleSearchType} className="font-bold text-green-400 w-1/4 rounded-sm">
        <option value="title">title</option>
        <option value="ingredient">ingredient</option>
      </select>
      {/* <button className="button" onClick={createRecipe}>Add Recipe</button>    */}
  </nav>
  )
};

export default NavBar;