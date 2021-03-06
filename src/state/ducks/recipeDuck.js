import axios from 'axios';
import axiosWithAuth from '../../axios/axiosWithAuth';
const { REACT_APP_SEARCH_URL, REACT_APP_API_KEY, REACT_APP_SEARCH_CX } = process.env;

/******************************************************
 * USER ACTION TYPES
 ******************************************************/
export const GET_RECIPE_START = 'GET_RECIPE_START';
export const GET_RECIPE_SUCCESS = 'GET_RECIPE_SUCCESS';
export const GET_RECIPE_FAIL = 'GET_RECIPE_FAIL';
export const GET_RECIPE_RESOLVE = 'GET_RECIPE_RESOLVE';

export const ADD_RECIPE_START = 'ADD_RECIPE_START';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAIL = 'ADD_RECIPE_FAIL';
export const ADD_RECIPE_RESOLVE = 'ADD_RECIPE_RESOLVE';

export const EDIT_RECIPE_START = 'EDIT_RECIPE_START';
export const EDIT_RECIPE_SUCCESS = 'EDIT_RECIPE_SUCCESS';
export const EDIT_RECIPE_FAIL = 'EDIT_RECIPE_FAIL';
export const EDIT_RECIPE_RESOLVE = 'EDIT_RECIPE_RESOLVE';

export const DELETE_RECIPE_START = 'DELETE_RECIPE_START';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAIL = 'DELETE_RECIPE_FAIL';
export const DELETE_RECIPE_RESOLVE = 'DELETE_RECIPE_RESOLVE';

export const VIEW_RECIPE_START = 'VIEW_RECIPE_START';
export const VIEW_RECIPE_SUCCESS = 'VIEW_RECIPE_SUCCESS';

export const SEARCH_RECIPE_START = 'SEARCH_RECIPE_START';
export const SEARCH_RECIPE_SUCCESS = 'SEARCH_RECIPE_SUCCESS';

export const SEARCH_TYPE_START = 'SEARCH_TYPE_START';
export const SEARCH_TYPE_SUCCESS = 'SEARCH_TYPE_SUCCESS';

export const FILTER_TYPE_START = 'FILTER_TYPE_START';
export const FILTER_TYPE_SUCCESS = 'FILTER_TYPE_SUCCESS';

export const SEARCH_IMAGE_START = 'SEARCH_IMAGE_START';
export const SEARCH_IMAGE_SUCCESS = 'SEARCH_IMAGE_SUCCESS';
export const SEARCH_IMAGE_FAIL = 'SEARCH_IMAGE_FAIL';
export const SEARCH_IMAGE_RESOLVE = 'SEARCH_IMAGE_RESOLVE';



/******************************************************
 * USER ACTIONS
 ******************************************************/

export const recipeActions = {

  // GET RECIPES
  getRecipes: () => dispatch => {
    dispatch({ type: GET_RECIPE_START });

    axiosWithAuth().get('/users/getuserinfo')
      .then(res => {
        dispatch({ type: GET_RECIPE_SUCCESS, payload: res.data.recipes })
      })
      .catch(err => {
        dispatch({ type: GET_RECIPE_FAIL, payload: err });
      })
      .finally(() => dispatch({ type: GET_RECIPE_RESOLVE }));
  },

  // ADD RECIPE
  addRecipe: (newRecipe) => dispatch => {
    dispatch({ type: ADD_RECIPE_START });

    axiosWithAuth()
    .post('/recipes/recipe', newRecipe)
    .then(res => {
      dispatch({ type: ADD_RECIPE_SUCCESS });
    })
    .catch(err => dispatch({ type: ADD_RECIPE_FAIL }))
    .finally(() => dispatch({ type: ADD_RECIPE_RESOLVE }));
  }, 

  // EDIT RECIPE
  editRecipe: (recipeId, updatedRecipe) => dispatch => {
    dispatch({ type: EDIT_RECIPE_START });

    axiosWithAuth()
      .put(`/recipes/recipe/${recipeId}`, updatedRecipe)
      .then(res => {
        dispatch({ type: EDIT_RECIPE_SUCCESS });
      })
      .catch(err => dispatch({ type: EDIT_RECIPE_FAIL }))
      .finally(() => dispatch({ type: EDIT_RECIPE_RESOLVE }));
  }, 

  // DELETE RECIPE
  deleteRecipe: (recipeId) => dispatch => {
    dispatch({ type: DELETE_RECIPE_START });

    axiosWithAuth()
    .delete(`/recipes/recipe/${recipeId}`)
    .then(res => {
      dispatch({ type: DELETE_RECIPE_SUCCESS });
    })
    .catch(err => dispatch({ type: DELETE_RECIPE_FAIL }))
    .finally(() => dispatch({ type: DELETE_RECIPE_RESOLVE }));
  },

  // VIEW RECIPE
  viewRecipe: (recipeName) => dispatch => {
    dispatch({ type: VIEW_RECIPE_START });
    dispatch({ type: VIEW_RECIPE_SUCCESS, payload: recipeName });
  },

  // CREATE RECIPE
  createRecipe: (boolean) => dispatch => {
    dispatch({ type: VIEW_RECIPE_START });
    dispatch({ type: VIEW_RECIPE_SUCCESS, payload: boolean });
  },

  // SEARCH RECIPE
  searchRecipe: (recipename) => dispatch => {
    dispatch({ type: SEARCH_RECIPE_START });
    dispatch({ type: SEARCH_RECIPE_SUCCESS, payload: recipename });
  },

  // SEARCH TYPE
  searchType: (type) => dispatch => {
    dispatch({ type: SEARCH_TYPE_START });
    dispatch({ type: SEARCH_TYPE_SUCCESS, payload: type });
  },

  // SEARCH FILTER TYPE
  filterType: (type) => dispatch => {
    dispatch({ type: FILTER_TYPE_START });
    dispatch({ type: FILTER_TYPE_SUCCESS, payload: type });
  },

  // SEARCH IMAGE
  searchImage: (imageQuery) => dispatch => {
    dispatch({ type: SEARCH_IMAGE_START });

    axios
    .get(`${REACT_APP_SEARCH_URL}?key=${REACT_APP_API_KEY}&cx=${REACT_APP_SEARCH_CX}&q=${imageQuery}&searchType=image`)
    .then(res => {
      console.log(res.data.items)
      dispatch({ type: SEARCH_IMAGE_SUCCESS, payload: res.data.items });
    })
    .catch(err => dispatch({ type: SEARCH_IMAGE_FAIL }))
    .finally(() => dispatch({ type: SEARCH_IMAGE_RESOLVE }));
  },

};

/******************************************************
 * USER INITIAL STATE
 ******************************************************/
export const recipeInitialState = {
  recipes: [],
  imageSearch: [],
  viewing: '',
  searchType: 'Title',
  filterType: '',
  search: '',
  status: 'idle',
};

/******************************************************
 * USER REDUCER
 ******************************************************/
const recipeReducer = (state = recipeInitialState, action) => {
  switch (action.type) {

  // GET RECIPE
  case GET_RECIPE_START:
    return { ...state, status: 'get-recipe/pending' };
  case GET_RECIPE_SUCCESS:
    return {
    ...state,
    recipes: action.payload,
    status: 'get-recipe/success',
    error: ''
    };
  case GET_RECIPE_FAIL:
    return { ...state, status: 'get-recipe/error', error: action.payload };
  case GET_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // ADD RECIPE
  case ADD_RECIPE_START:
    return { ...state, status: 'add-recipe/pending' };
  case ADD_RECIPE_SUCCESS:
    return {
    ...state,
    status: 'add-recipe/success',
    error: ''
    };
  case ADD_RECIPE_FAIL:
    return { ...state, status: 'add-recipe/error', error: action.payload };
  case ADD_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // EDIT RECIPE
  case EDIT_RECIPE_START:
    return { ...state, status: 'edit-recipe/pending' };
  case EDIT_RECIPE_SUCCESS:
    return {
    ...state,
    status: 'edit-recipe/success',
    error: ''
    };
  case EDIT_RECIPE_FAIL:
    return { ...state, status: 'edit-recipe/error', error: action.payload };
  case EDIT_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // DELETE RECIPE
  case DELETE_RECIPE_START:
    return { ...state, status: 'delete-recipe/pending' };
  case DELETE_RECIPE_SUCCESS:
    return {
    ...state,
    status: 'delete-recipe/success',
    error: ''
    };
  case DELETE_RECIPE_FAIL:
    return { ...state, status: 'delete-recipe/error', error: action.payload };
  case DELETE_RECIPE_RESOLVE:
    return { ...state, status: 'idle' };

  // VIEW RECIPE
  case VIEW_RECIPE_START:
    return { ...state, status: 'view-recipe/pending' };
  case VIEW_RECIPE_SUCCESS:
    return {
    ...state,
    viewing: action.payload,
    status: 'view-recipe/success',
    error: ''
    };

  // SEARCH RECIPE
  case SEARCH_RECIPE_START:
    return { ...state, status: 'search-recipe/pending' };
  case SEARCH_RECIPE_SUCCESS:
    return {
    ...state,
    search: action.payload,
    status: 'search-recipe/success',
    error: ''
    };

  // SEARCH TYPE
  case SEARCH_TYPE_START:
    return { ...state, status: 'search-type/pending' };
  case SEARCH_TYPE_SUCCESS:
    return {
    ...state,
    searchType: action.payload,
    status: 'search-type/success',
    error: ''
    };

  // SEARCH FILTER TYPE
  case FILTER_TYPE_START:
    return { ...state, status: 'search-type/pending' };
  case FILTER_TYPE_SUCCESS:
    return {
    ...state,
    filterType: action.payload,
    status: 'search-type/success',
    error: ''
    };


  // SEARCH IMAGE
  case SEARCH_IMAGE_START:
    return { ...state, status: 'search-image/pending' };
  case SEARCH_IMAGE_SUCCESS:
    return {
    ...state,
    imageSearch: action.payload,
    status: 'search-image/success',
    error: ''
    };
  case SEARCH_IMAGE_FAIL:
    return { ...state, status: 'search-image/error', error: action.payload };
  case SEARCH_IMAGE_RESOLVE:
    return { ...state, status: 'idle' };

  // DEFAULT
  default:
    return state;
  }
};

export default recipeReducer;
