import { LoginForm, Recipes } from './components';
import ProtectedRoute from './routes/ProtectedRoute';
import { Switch, Route } from 'react-router';
import AddRecipeForm from './components/AddRecipeForm';

const App = () => {
  return (
    <>
      <header>
        <h1 className="logo">Recipe Book</h1>
      </header>
      <section className="m-2">
        <Switch>
          <ProtectedRoute path="/add-recipe" component={AddRecipeForm} />
          <ProtectedRoute path="/recipes" component={Recipes} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </section>
    </>
  );
}

export default App;
