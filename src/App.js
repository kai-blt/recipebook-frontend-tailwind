import { LoginForm, Recipes } from './components';
import ProtectedRoute from './routes/ProtectedRoute';
import { Switch, Route } from 'react-router';

const App = () => {
  return (
    <>
      <header>
        <h1 className="font-bold text-8xl text-green-400 text-center">Recipe Book</h1>
      </header>
      <section className="m-2">
        <Switch>
          <ProtectedRoute path="/recipes" component={Recipes} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </section>
    </>
  );
}

export default App;
