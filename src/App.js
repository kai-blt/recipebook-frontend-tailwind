import { NavBar, LoginForm, Recipes } from './components';
import ProtectedRoute from './routes/ProtectedRoute';
import { Switch, Route, useLocation } from 'react-router';
import AddRecipeForm from './components/AddRecipeForm';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();

  useEffect(()=> {
    console.log(location)
  }, [location]);

  return (
    <div>
      <header className="w-full">
        {location.pathname === "/"
          ? <h1 className="logo">Recipe Book</h1>
          : <NavBar />
         }
      </header>
      <section className="m-2">
        <Switch>
          <ProtectedRoute path="/add-recipe" component={AddRecipeForm} />
          <ProtectedRoute path="/recipes" component={Recipes} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </section>
    </div>
  );
}

export default App;
