import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { recipeActions, userActions } from '../state/ducks';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [clickedDropdown, setClickedDropdown] = useState(false);

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
    setClicked(!clicked);
    toggleSearchType();
    dispatch(recipeActions.searchType(e.target.innerHTML));
  };

  const toggleSearchType = () => {
    const filter = document.querySelector('.search-filter');
    const secondary_item = document.querySelector('.search-filter-item');
    setClickedDropdown(!clickedDropdown);
    filter.classList.toggle('h-24');
    secondary_item.classList.toggle('block');
  };
  
  const toggleMenu = () => {
    const menu = document.querySelector('.menu-invisible');
    const hamburger = document.querySelector('button');
    hamburger.classList.toggle('transform');
    hamburger.classList.toggle('rotate-180');
    menu.classList.toggle('visible');
    menu.classList.toggle('bg-opacity-95');
    menu.classList.toggle('opacity-100');
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

  const filterType = (type) => {    
    toggleMenu();
    dispatch(recipeActions.filterType(type));
    dispatch(recipeActions.viewRecipe(""));
    push('/recipes');
  }

  const logOut = () => {
    dispatch(userActions.logout());
  };

  return(    
    <nav className="navbar"> 
      <button onClick={toggleMenu} className="w-10 transition duration-200">
        <svg viewBox="0 0 100 60" fill="white" width="40" height="40">
          <rect width="100" height="15"></rect>
          <rect y="25" width="100" height="15"></rect>
          <rect y="50" width="100" height="15"></rect>
        </svg>
      </button>      
      <p className="absolute invisible left-20 md:visible text-white align-middle md:text-3xl ">RECIPE BOOK</p>
      <div className="w-2/3 relative">
        <div className="search-filter">
          <ul>
            <li className="mb-4">
              <div className="flex flex-row justify-between">
                <div className="cursor-pointer hover:text-gray-400" onClick={e => handleSearchType(e)}>{!clicked ? "Title" : "Ingredient"}</div>
                {clickedDropdown
                  ? <div className="cursor-pointer hover:text-gray-400" onClick={toggleSearchType}>&#9650;</div>
                  : <div className="cursor-pointer hover:text-gray-400" onClick={toggleSearchType}>&#9660;</div>
                }
              </div>
            </li>
            <li className="search-filter-item">
                <div onClick={e => handleSearchType(e)}>{!clicked ? "Ingredient" : "Title"}</div>
            </li>
          </ul>
        </div>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearch}
          onFocus={viewRecipe}
          className="searchbar"
        />      
      </div>
      <div className="menu-invisible">
        <p className="text-5xl mb-8 md:hidden">RECIPE BOOK</p>
        <ul>
          <li className="navlink mb-10" onClick={createRecipe}>New Recipe</li>
          <li className="navlink mb-2" onClick={()=> filterType('')}>All Recipes</li>
          <li className="navlink mb-2" onClick={()=> filterType('main')}>Main</li>
          <li className="navlink mb-2" onClick={()=> filterType('side')}>Side</li>
          <li className="navlink mb-2" onClick={()=> filterType('sweets')}>Sweets</li>
          <li className="navlink mb-10" onClick={()=> filterType('drink')}>Drinks</li>
          <li className="navlink mb-2" onClick={logOut}>Logout</li>
        </ul>
      </div>
  </nav>
  )
};

export default NavBar;