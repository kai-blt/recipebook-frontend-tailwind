import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../state/ducks';


const LoginForm = (props) => {  
  const [formValues, setFormValues] = useState({username: '', email: '', password: ''});
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const { push } = useHistory();
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);

  useEffect(() => {
    if (status === 'login/success') {
      push('/recipes');
    }
  }, [status, error, push]);

  const handleInput = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const signIn = (e) => {
    e.preventDefault();
    const { username, password } = formValues;
    dispatch(userActions.login(username, password));
  };

  const signUp = (e) => {
    e.preventDefault();    
    dispatch(userActions.signup(formValues));
    setIsCreatingAccount(!isCreatingAccount);
  };

  return (
    <>
    {!isCreatingAccount
      ?
      <>
        <form onSubmit={signIn}>
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInput}
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInput}
            className="input"
          />
          <button className="button">Sign In</button>
        </form>
        <span onClick={() => setIsCreatingAccount(!isCreatingAccount)} className="link">Don't have an account? Sign Up!</span>
      </>
      :
      <>
        <form onSubmit={signUp}>
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInput}
            className="input"
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInput}
            className="input"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInput}
            className="input"
          />
          <button className="button">Sign Up</button>
        </form>
      </>
    }      
    </>
  );
}

export default LoginForm;