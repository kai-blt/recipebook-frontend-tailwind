import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { recipeActions, userActions } from '../state/ducks';

const NavBar = () => {
  const [search, setSearch] = useState('');
  
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(recipeActions.searchRecipe(search));
  }, [dispatch, search])

  useEffect(() => {
    if (status === 'logout/success') {
      push('/');
    };
  }, [status, push]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchType = (e) => {
    dispatch(recipeActions.searchType(e.target.value));
  };

  
  const toggleMenu = () => {
    const menu = document.querySelector('.menu-invisible');
    const hamburger = document.querySelector('button');
    hamburger.classList.toggle('transition');
    hamburger.classList.toggle('duration-200');
    hamburger.classList.toggle('transform');
    hamburger.classList.toggle('rotate-90');
    menu.classList.toggle('menu-visible');
  };
  
  const createRecipe = () => {
    toggleMenu();
    push('/add-recipe');
  };

  const viewRecipe = () => {    
     // Scroll to top for Safari
     document.body.scrollTop = 0;
     // Scroll to top for Chrome, Firefox, IE, Opera
     document.documentElement.scrollTop = 0; 
    dispatch(recipeActions.viewRecipe(""));
    push('/recipes');
  };

  const logOut = () => {
    dispatch(userActions.logout());
  };

  return(    
    <nav className="p-4 w-full  shadow-md flex flex-row justify-between fixed top-0 left-0 z-40 bg-green-400"> 
      <button onClick={toggleMenu} className="w-1/6">
        <svg className="text-green-400" viewBox="0 0 100 60" fill="white" width="40" height="40">
          <rect width="100" height="15"></rect>
          <rect y="25" width="100" height="15"></rect>
          <rect y="50" width="100" height="15"></rect>
        </svg>
      </button>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearch}
        onFocus={viewRecipe}
        className="input w-3/6 border-none"
      />      
      <select onChange={handleSearchType} className="font-bold text-green-400 w-1/4 rounded-sm">
        <option value="title">title</option>
        <option value="ingredient">ingredient</option>
      </select>
      <div className="menu-invisible">
        <ul>
          <li className="link" onClick={createRecipe}>Create New Recipe</li>
          <li className="link" onClick={logOut}>Logout</li>
        </ul>
      </div>
      {/* <button className="button" onClick={createRecipe}>Add Recipe</button>    */}
  </nav>
  )
};

export default NavBar;